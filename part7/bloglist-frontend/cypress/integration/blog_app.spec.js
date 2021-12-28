describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.visit('http://localhost:3000')
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
    })
})

describe('Login', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'alena',
            name: 'Alena',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
        cy.get('#username').type('alena')
        cy.get('#password').type('password')
        cy.get('#login-button').click()

        cy.contains('Alena logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('alena')
        cy.get('#password').type('notpassword')
        cy.get('#login-button').click()

        cy.get('.error').contains('wrong password or username')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
})

describe('When logged in', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            username: 'alena',
            name: 'Alena',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.login({ username: 'alena', password: 'password' })
    })

    it('a new blog can be created', function() {
        cy.contains('create new blog').click()

        cy.get('#title').type('Data-Driven Evaluation of Football Players’ Skills')
        cy.get('#author').type('Ofir Magdaci')
        cy.get('#url').type('https://towardsdatascience.com/data-driven-evaluation-of-football-players-skills-c1df36d61a4e')
        cy.get('#new-blog-button').click()

        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci')
    })
})

describe('and the blog exists', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({
            username: 'alena',
            name: 'Alena',
            password: 'password'
        }) 
        cy.login({ username: 'alena', password: 'password' })
        cy.createBlog({
            title: 'Data-Driven Evaluation of Football Players’ Skills',
            author: 'Ofir Magdaci',
            url: 'https://towardsdatascience.com/data-driven-evaluation-of-football-players-skills-c1df36d61a4e'
        })

    })

    it('user can like it', function() {
        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci')
          .contains('view')
          .click()
        cy.contains('likes 0')
          .contains('like')
          .click()
        cy.contains('likes 1')
    })

    it('user can remove it', function() {
        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci')
          .contains('view')
          .click()
        cy.contains('remove').click()
        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci').should('not.exist')
    })

    it('other user cannnot remove it', function() {
        cy.contains('logout').click()
        cy.createUser({
            username: 'test',
            name: 'Test',
            password: 'test'
        })
        cy.login({ username: 'test', password: 'test' })
        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci')
          .contains('view')
          .click()
        cy.contains('remove').should('not.exist')
    })

    it('multiple blogs ordered according to the like number', function() {
        cy.createBlog({
            title: 'The Planet Lost 14% Of Coral Reefs In 10-Year Period, Startling Report...',
            author: 'Nick Visser',
            url: 'https://www.huffpost.com/entry/planet-coral-reefs-lost-10-years_n_615b'
        })
        cy.createBlog({
            title: '4 Reasons Why You Shouldn’t Use Machine Learning',
            author: 'Terence Shin',
            url: 'https://towardsdatascience.com/4-reasons-why-you-shouldnt-use-machine'
        })

        cy.contains('Data-Driven Evaluation of Football Players’ Skills Ofir Magdaci')
          .contains('view')
          .click()

        cy.contains('4 Reasons Why You Shouldn’t Use Machine Learning')
          .contains('view')
          .click()

        cy.contains('4 Reasons Why You Shouldn’t Use Machine Learning')
          .parent()
          .contains('like')
          .click()

        cy.wait(1000)
        
        cy.contains('The Planet Lost 14% Of Coral Reefs In 10-Year Period, Startling Report...')
          .contains('view')
          .click()
        
        cy.contains('The Planet Lost 14% Of Coral Reefs In 10-Year Period, Startling Report...')
          .parent()  
          .contains('like')
          .click()
          .click()

        cy.wait(1000)

        cy.get('.likes').then(blogs => {
            const likes = blogs.map((i, blog) => {
                return Number(blog.innerText.substring(6).slice(0, -5))
            })
            expect(likes.toArray().every((e, i, a) => i === 0 || a[i-1] >= e)).to.equal(true)
        })
        

        

    })
})