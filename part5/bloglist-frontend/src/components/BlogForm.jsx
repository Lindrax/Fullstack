import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog= (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>New blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title:<input
            data-testid='title'
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder='title'
          />
        </div>
        <div>
        author:<input
            data-testid='author'
            value={author}
            onChange={event => setAuthor(event.target.value)}
            placeholder='author'
          />
        </div>
        <div>
        url:<input
            data-testid='url'
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default BlogForm