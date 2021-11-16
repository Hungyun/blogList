const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

// blogsRouter.get('/', (request, response) => {
//     Blog.find({}).then(blogs => {
//       response.json(blogs)
//     })
//   })
 
blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({}).populate('user',{ blogs: 0 })
  response.json(blogs)
})



blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user
  const loginUserId = user._id
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: loginUserId,
    likes: body.likes
  })


  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await User.findByIdAndUpdate(loginUserId, user)

  response.json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async(request, response) =>{

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === request.user.id.toString() ){
    blog.delete()
    response.status(204).end()
  }
  else{
    response.status(400).json({ error: 'deletion failed due to wrong user id' })
  }
})

blogsRouter.put('/:id', async(request, response) =>{
  const { body } = request

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: request.params.id
  }

  await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(blog)
})
  
module.exports = blogsRouter