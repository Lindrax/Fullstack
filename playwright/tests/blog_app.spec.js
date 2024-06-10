const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to application')
    await expect(locator).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    
      await expect(page.getByText('Matti Luukkainen is logged in')).toBeVisible()
      
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()
    
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong username')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
 
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'a blog created by playwright', true)
      await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()
    })
    describe('and a blog exists',() => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'a blog created by playwright', true)
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', {name:'view'}).click()
        await page.getByRole('button', {name:'like'}).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })



  })
})

