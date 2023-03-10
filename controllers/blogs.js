const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
	response.json(blogs)
})
  
blogsRouter.post('/', userExtractor, async (request, response) => {
	const body = request.body
    const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: request.user._id
	})
	const savedBlog = await blog.save()

	request.user.blogs = request.user.blogs.concat(savedBlog._id)
	await request.user.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog.user.toString() !== request.user._id.toString()){
		return response.status(401).json({error: 'Token belongs to unauthorized user'})
	}

	const result = await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const body = {...request.body}
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const result= await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true, context: 'query'})
	response.json(result)
})

module.exports = blogsRouter