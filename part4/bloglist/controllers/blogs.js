const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.title === undefined || body.url === undefined) { response.status(400).end() }

    const users = await User.find({})
    const user = users[0]
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes === undefined? 0 : body.likes,
        url: body.url,
        user: user._id
    })

    user.blogs = [...user.blogs, blog]
    await user.save()
    const result = await blog.save()
    response.status(201).json(result)
})


blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(newBlog.toJSON())
})

module.exports = blogsRouter