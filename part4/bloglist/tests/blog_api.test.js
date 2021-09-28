const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

const api = supertest(app)

describe('test HTTP GET request to /api/blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('the correct number of blogs is returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
    
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })
})

test('an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'Using Docker for Deep Learning projects',
        author: 'Margaux Masson-Forsythe',
        url: 'https://towardsdatascience.com/using-docker-for-deep-learning-projects-fa51d2c4f64c',
        likes: 10
    }

    const user = {
        username: 'alena',
        password: 'password',
        name: 'Alena'
    }

    await api.post('/api/users').send(user).expect(201)
    const login = await api.post('/api/login').send(user)
    const token = login.body.token

    await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${token}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => ({
        title: blog.title, 
        author: blog.author, 
        url: blog.url, 
        likes: blog.likes
    }))

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(newBlog)
})

describe('handling missing data in POST requests', () => {

    test('missing value of likes is set to 0', async () => {
        const newBlog = {
            title: 'Using Docker for Deep Learning projects',
            author: 'Margaux Masson-Forsythe',
            url: 'https://towardsdatascience.com/using-docker-for-deep-learning-projects-fa51d2c4f64c',
        }

        const user = {
            username: 'alena',
            password: 'password',
            name: 'Alena'
        }
    
        await api.post('/api/users').send(user).expect(201)
        const login = await api.post('/api/login').send(user)
        const token = login.body.token
    
        await api
            .post('/api/blogs')
            .set({ 'Authorization': `bearer ${token}` })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        expect(response.body[helper.initialBlogs.length].likes).toEqual(0)
    
    
    })
    
    test('missing title leads to 400 Bad Request', async () => {
        const newBlog = {
            author: 'Margaux Masson-Forsythe',
            url: 'https://towardsdatascience.com/using-docker-for-deep-learning-projects-fa51d2c4f64c',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
    
    test('missing url leads to 400 Bad Request', async () => {
        const newBlog = {
            title: 'Using Docker for Deep Learning projects',
            author: 'Margaux Masson-Forsythe',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('missing title and url leads to 400 Bad Request', async () => {
        const newBlog = {
            author: 'Margaux Masson-Forsythe',
            likes: 5
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('missing authorization heades leads to 401 Unauthorized', async () => {
        const newBlog = {
            title: 'Using Docker for Deep Learning projects',
            author: 'Margaux Masson-Forsythe',
            url: 'https://towardsdatascience.com/using-docker-for-deep-learning-projects-fa51d2c4f64c',
            likes: 10
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

test('successfully deleting a blog by id if id is valid', async () => {
    const user = {
        username: 'alena',
        password: 'password',
        name: 'Alena'
    }

    const newBlog = {
        title: 'Using Docker for Deep Learning projects',
        author: 'Margaux Masson-Forsythe',
        url: 'https://towardsdatascience.com/using-docker-for-deep-learning-projects-fa51d2c4f64c',
        likes: 10,
    }

    await api.post('/api/users').send(user).expect(201)
    const login = await api.post('/api/login').send(user)
    const token = login.body.token

    const result = await api
        .post('/api/blogs')
        .set({ 'Authorization': `bearer ${token}` })
        .send(newBlog)
        .expect(201)

    await api
        .delete(`/api/blogs/${result.body.id}`)
        .set({ 'Authorization': `bearer ${token}` })
        .expect(204)

    const final = await helper.blogsInDb()
    expect(final).toHaveLength(helper.initialBlogs.length)
})


test('successfully updated a blog by id', async () => {
    const blogToUpdate = helper.initialBlogs[0]

    const newBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 9
    }

    await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const updated = await Blog.findById(blogToUpdate._id)
    expect(updated.likes).toEqual(newBlog.likes)

})

afterAll(() => {
    mongoose.connection.close()
})
