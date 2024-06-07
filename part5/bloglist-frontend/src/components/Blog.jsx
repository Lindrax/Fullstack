import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [state, setState] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const toggleView = (event) => {
    setState(!state)
    console.log(state)
  }

  const like =(event) => {
    console.log(blog)
    const newBlog={
      ...blog,
      likes: blog.likes +1
    }
    const id = blog.id
    blogService
    .update(blog.id, newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
  }

  const simple = () => {
    return (
      <div>
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        </div>  
    </div>
  )
}
  const expanded = () => {
    return (
      <div style ={blogStyle}>
        <p>{blog.author} <button onClick={toggleView}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={like}>like</button></p>
        <p>{blog.author}</p>
      </div>
    )
  }

  if (state === true){
    return(
      <div>
        {simple()}
      </div>
    )
  }
  if (state === false){
    return(
      <div>
        {expanded()}
      </div>
    )
  }
}

export default Blog