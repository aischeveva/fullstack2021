const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

const api = supertest(app)

describe('invalid users are not created', () => {

    test('user with username shorter than 3 symbols is not created', async () => {
        const newUser = {
            username: 't',
            password: 'testpassword',
            name: 'test person'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
    })

    test('user with password shorter than 3 symbols is not created', async () => {
        const newUser = {
            username: 'username',
            password: 't',
            name: 'test person'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
            .expect('Content-Type', /application\/json/)
    })

    test('user is not created, if the username already exists in database', async () => {
        const users = await User.find({})

        const newUser = {
            username: users[0].username,
            password: 'password',
            name: 'another test person'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(500)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})