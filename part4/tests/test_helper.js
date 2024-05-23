const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'testi',
    'author': 'axel',
    'url': 'testaus123',
    'likes': 1,
    'id': '664b15720a0c7495ce688324'
  },
  {
    'title': 'toinen',
    'author': 'axel',
    'url': 'testaus12',
    'likes': 1,
    'id': '664b1ed9eaf031574cdf2ef3'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}