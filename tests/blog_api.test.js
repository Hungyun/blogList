const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const blogs = response.body
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })


test('exer4.9 name of unique identifier should be "id"', async () =>{
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const idproperty = blogs[0].id
    expect(idproperty).toBeDefined()
})

test('Login test adding user and add a new blog', async () =>{
  const user ={
    username: "steve",
    password: "1111"
  }
  await api
  .post('/api/users')
  .send(user)
  .expect(200)
  const response = await api.post('/api/login').send(user).expect(200)
  const token = 'bearer ' + response.body.token
  // expect(token).toBe('hello')
  const myblog = {
    title: 'from testing adding a new ...',
    author: 'adding tester',
    url: 'www.test.idv',
    likes: 0,
  }
  
  await api.post('/api/blogs').set('Authorization', token).send(myblog).expect(200)
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'from testing adding a new ...'
  )
})

test('new user and add a new blog without token', async () =>{
  const user ={
    username: "mary",
    password: "1111"
  }
  await api
  .post('/api/users')
  .send(user)
  .expect(200)
  const response = await api.post('/api/login').send(user).expect(200)
  const token = 'bearer ' + response.body.token
  // expect(token).toBe('hello')
  const myblog = {
    title: 'from testing adding a new ...',
    author: 'adding tester',
    url: 'www.test.idv',
    likes: 0,
  }
  
  await api.post('/api/blogs').send(myblog).expect(401)
})




afterAll(() => {
    mongoose.connection.close()
  })