const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: "this is a title",
        author: "Steve",
        url: "www.google.com",
        likes:19
    },
    {
        title: "this is also a title",
        author: "Steve junior",
        url: "www.yahoo.com",
        likes:100
    },    
    {
        title: "How I met your mother",
        author: "Steve Jobs",
        url: "www.apple.com",
        likes:1000
    },
    {
        title: "Special in testDB",
        author: "tester",
        url: "www.mongodb.com",
        likes: 54088
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
  }