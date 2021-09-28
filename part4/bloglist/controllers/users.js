const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})

    response.json(users.map(user => user.toJSON()).map(user => ({username: user.username, name: user.name, id: user.id, blogs: user.blogs})))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body)

    if(body.password === undefined || body.password.length < 3) response.status(500).json({ error: 'password is missing or shorter than 3 symbols' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        password: passwordHash,
        name: body.name
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter