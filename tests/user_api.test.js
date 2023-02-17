const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})
})

describe('New user is not added', () => {
    test('if username is missing', async () => {
        const testUser = {
            name: 'Testi Jannu',
            password: 'salasana'
        }
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('if length of username is less than three', async () => {
        const testUser = {
            username: 'UN',
            name: 'Testi Jannu',
            password: 'salasana'
        }
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('if username is not unique', async () => {
        const testUser1 = {
            username: 'Uniikki',
            name: 'Testi Jannu',
            password: 'salasana'
        }
        await api
            .post('/api/users')
            .send(testUser1)
            .expect(201)

        const testUser2 = {
            username: 'Uniikki',
            name: 'Testi Jannu2',
            password: 'salasana2'
        }
        await api
            .post('/api/users')
            .send(testUser2)
            .expect(400)
    })

    test('if password is missing', async () => {
        const testUser = {
            username: 'TJannu',
            name: 'Testi Jannu',
        }
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })

    test('if length of password is less than three', async () => {
        const testUser = {
            username: 'TJannu',
            name: 'Testi Jannu',
            password: 'TJ'
        }
        await api
            .post('/api/users')
            .send(testUser)
            .expect(400)
    })
})