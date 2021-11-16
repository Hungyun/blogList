const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    let sum = 0
    blogs.map(blog =>{
        sum += blog.likes
    })
    return sum
}

const favoriteBlog = (blogs) => {
    let resultBlog = {}
    let maxLike = 0
    blogs.map(blog =>{
        if(blog.likes>maxLike){
            maxLike = blog.likes
            resultBlog = blog
        }
    })

    const obj = {
        title: resultBlog.title,
        author: resultBlog.author,
        likes: resultBlog.likes
    }
    return obj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}