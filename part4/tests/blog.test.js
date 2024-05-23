const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  let BlogObject = new Blog(initialBlogs[0])
  await BlogObject.save()

  BlogObject = new Blog(initialBlogs[1])
  await BlogObject.save()
})


test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})