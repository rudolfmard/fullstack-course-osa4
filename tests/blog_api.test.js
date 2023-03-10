const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('The blogs are returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('The correct number of blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('Blog object contains field "id"', async () => {
    const response = await api.get('/api/blogs')
    for(let blog of response.body){
        expect(blog.id).toBeDefined()
    }
})

test('After adding one blog the number of blogs increment by one', async () => {
    const testBlog = {
        title: "Test blog",
        author: "Testi Jannu",
        url: "https://eioo.com/",
        likes: 0
    }
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('Field "likes" defaults to 0 if it is not defined when a blog is added', async () => {
    await Blog.deleteMany({})

    const testBlog = {
        title: "Another test blog",
        author: "Testi Jannun veli",
        url: "https://eiooeikatuu.com/",
    }
    await api
        .post('/api/blogs')
        .send(testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toBe("Another test blog",)
    expect(response.body[0].likes).toBe(0)
})

describe('New blog must contain fields', () => {
    test('title', async () => {
        const testBlog = {
            author: "Testi Jannun veli",
            url: "https://eiooeikatuu.com/",
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(400)
    })

    test('url', async () => {
        const testBlog = {
            title: "Another test blog",
            author: "Testi Jannun veli",
            likes: 0
        }
        await api
            .post('/api/blogs')
            .send(testBlog)
            .expect(400)
    })
})

test('Deleting a single blog decreases the number of blogs by one', async () => {
    await api
        .delete('/api/blogs/5a422bc61b54a676234d17fc')
        .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length-1)
})

test('Change in the number of likes goes to the database', async () => {
    const changedBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 400,
    }

    await api
        .put('/api/blogs/5a422ba71b54a676234d17fb')
        .send(changedBlog)
        .expect(200)
    
    const response = await api.get('/api/blogs')
    const changedFromDB = response.body.filter(b => b.id === '5a422ba71b54a676234d17fb')[0]
    expect(changedFromDB.likes).toBe(400)
})