const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
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

    await api
        .post('/api/blogs')
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
    
        await api
            .post('/api/blogs')
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
})

test('successfully deleting a blog by id if id is valid', async () => {
    const initial = await helper.blogsInDb()
    const id = initial[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    const final = await helper.blogsInDb()
    expect(final).toHaveLength(initial.length - 1)
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
