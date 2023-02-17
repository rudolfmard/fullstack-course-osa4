const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
	response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
	allUsers = await User.find({})
	blogAdder = allUsers[0]

	const body = request.body
    const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes,
		user: blogAdder._id
	})
	const savedBlog = await blog.save()

	blogAdder.blogs = blogAdder.blogs.concat(savedBlog._id)
	await blogAdder.save()

	response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
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