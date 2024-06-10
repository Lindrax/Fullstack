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
    await request.post('/api/users', {
      data: {
        name: 'testaus',
        username: 'test',
        password: 'super'
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

      test('removing a blog', async ({ page }) => {
        page.on('dialog', async (dialog ) => 
          {await dialog.accept()}
        )
        await page.getByRole('button', {name:'view'}).click()
        await page.getByRole('button', {name: 'remove'}).click()

        await expect(page.getByText('playwright.com')).not.toBeVisible()
      })

      describe('another user is logged in', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', {name:'logout'}).click()
          await loginWith(page, 'test', 'super')
          })
          
        test('remove button is not visible for someone elses blog', async ({ page }) => {
          await expect(page.getByText('a blog created by playwright playwright')).toBeVisible()  
          await page.getByRole('button', {name:'view'}).click()
          await expect(page.getByRole('button', {name: 'remove'})).not.toBeVisible()
        })
        })
      describe('multiple blogs exist', () => {
        beforeEach(async ({ page }) => {
          await createBlog(page, 'most liked blog', true)
        })
        test('most liked blog is first', async ({ page }) => {
          await page.getByRole('button', {name:'view'}).first().click()
          await page.getByRole('button', {name:'like'}).first().click()
          const blogPosts = await page.locator('.blog')
          const firstBlogPost = await blogPosts.first().textContent()
          await expect(firstBlogPost).toContain('a blog created by')
          await page.getByRole('button', {name:'view'}).last().click()
          await page.getByRole('button', {name:'like'}).last().click()
          await page.getByRole('button', {name:'like'}).last().click()
          await page.getByRole('button', {name:'like'}).last().click()

          const posts = await page.locator('.blog')
          const first = await posts.first().textContent()
          await expect(first).toContain('most liked')
        })
      })
    })
  })
})
