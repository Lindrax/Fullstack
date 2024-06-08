import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'
import BlogForm from './BlogForm'


test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'minä',
    url: 'testing'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library minä')
})

test('clicking the view button shows everything', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'minä',
    url: 'testing',
    likes: '20',
    user: {
      id: '6662edbbad69796f3755057f',
      name: 'matti',
      username: 'mluukkai'
    }
  }

  const mockHandler = vi.fn()

  const { container } = render(
    <Blog blog={blog} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library by minä hidetestinglikes 20 likematti'
  )
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'väärä lisääjä',
    author: 'heh',
    url: 'testauaaa',
    likes: '13',
    user: {
      id: '6662edbbad69796f3755057f',
      name: 'matti',
      username: 'mluukkai'
    },
    id: '6662ee11ad69796f37550583'
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} likeBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const like = screen.getByText('like')
  await user.click(like)
  await user.click(like)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'testing a form...')
  await user.type(author, 'testausbotti...')
  await user.type(url, 'http.test')
  await user.click(sendButton)
  console.log(createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    title: 'testing a form...',
    author: 'testausbotti...',
    url: 'http.test',
  })
})