const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) { response.status(400).end() }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes === undefined? 0 : body.likes,
        url: body.url
    })

    const result = await blog.save()
    response.status(201).json(result)
})

module.exports = blogsRouter