import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
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
  }

  const like =(event) => {
    const user = blog.user
    const newBlog={
      ...blog,
      likes: blog.likes +1
    }
    const id = blog.id
    blogService
    .update(blog.id, newBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : {
        ...returnedBlog,
        user: user}))
    })
  }

  const deleteBlog=(event) => {
    if (confirm(`Remove blog ${blog.name} by ${blog.author}`)){
      const id = blog.id
      blogService
      .remove(blog.id)
      .then(returnedblog => {
      setBlogs(blogs.filter(blog => blog.id !== id))
      })
    }
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
    const show = blog.user.name===user.name

    console.log(show)

    return (
      <div style ={blogStyle}>
        <p>{blog.title} by {blog.author} <button onClick={toggleView}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
        
        {show && <button onClick={deleteBlog}>remove</button>}
  
        
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