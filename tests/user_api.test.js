const mongoose = require('mongoose')
const supertest = require('supertest')
const logger = require('../utils/logger')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


beforeEach(async () => {
    await User.deleteMany({})
  
    // const blogObjects = helper.initialBlogs
    //   .map(blog => new Blog(blog))
    // const promiseArray = blogObjects.map(blog => blog.save())
    // await Promise.all(promiseArray)
  })

test('Adding a new user without username or url', async () =>{
    const newUser ={
        username: "",
        password: "345",
        name: '',
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
})

test('Adding a new user normally', async () =>{
    const newUser ={
        username: "john",
        password: "1000",
        name: 'John Mike',
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
})


afterAll(async()=> {
    mongoose.connection.close()
})