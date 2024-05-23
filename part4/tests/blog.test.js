const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')




beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id is id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    assert.ok(blog.id)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    'title': 'kolmas',
    'author': 'meitsi',
    'url': 'testaus13',
    'likes': 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length +1)
  assert(title.includes('kolmas'))
})

test('a blog without likes has 0 likes', async () => {
  const newBlog = {
    'title': 'neljäs',
    'author': 'meitsi',
    'url': 'testaus14',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('a blog without title is rejected', async () => {
  const blogWoTitle = {
    'author': 'meitsi',
    'url': 'testaus14',
    'likes': 20
  }
  await api
    .post('/api/blogs')
    .send(blogWoTitle)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('a blog without url is rejected', async () => {
  const blogWoUrl = {
    'title': 'neljäs',
    'author': 'meitsi',
    'likes': 21
  }

  await api
    .post('/api/blogs')
    .send(blogWoUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()


  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('deletion of a blogs', async() => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})

test('updating a blog', async () => {
  const blogs =await helper.blogsInDb()
  const blogToUpdate = blogs[0]
  const newblog={
    'title': 'testi',
    'author': 'axel',
    'url': 'testaus123',
    'likes': 20,
    'id': '664b15720a0c7495ce688324'
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newblog)

  assert.strictEqual(response.body.likes, newblog.likes)

})

after(async () => {
  await mongoose.connection.close()
})

