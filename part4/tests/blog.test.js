const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    console.log(usersAtEnd)
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
  test('creation fails with proper statuscode and message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'te',
      name: 'testi',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('username too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'testi',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('password too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

describe('blogs', () =>  {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const user = await helper.usersInDb()
    const id = user[0].id
    const initialBlogs = [
      {
        'title': 'testi',
        'author': 'axel',
        'url': 'testaus123',
        'likes': 1,
        'id': '664b15720a0c7495ce688324',
        'user': id
      },
      {
        'title': 'toinen',
        'author': 'axel',
        'url': 'testaus12',
        'likes': 1,
        'id': '664b1ed9eaf031574cdf2ef3',
        'user': id
      }
    ]
    await Blog.insertMany(initialBlogs)
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

    const token = await helper.tokenHelper()
    console.log(token)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
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
    const token = await helper.tokenHelper()
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('a blog without title is rejected', async () => {
    const token = await helper.tokenHelper()
    const blogWoTitle = {
      'author': 'meitsi',
      'url': 'testaus14',
      'likes': 20
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWoTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog without url is rejected', async () => {
    const token = await helper.tokenHelper()
    const blogWoUrl = {
      'title': 'neljäs',
      'author': 'meitsi',
      'likes': 21
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWoUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()


    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('deletion of a blogs', async() => {
    const blogsAtStart = await helper.blogsInDb()
    console.log(blogsAtStart)
    const blogToDelete = blogsAtStart[0]

    const token = await helper.tokenHelper()
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
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
  test('posting a blog fails without a token', async () => {
    const newBlog = {
      'title': 'kolmas',
      'author': 'meitsi',
      'url': 'testaus13',
      'likes': 2,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })
})

after(async () => {
  await mongoose.connection.close()
})