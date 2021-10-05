import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
      setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = (event) => {
    event.preventDefault()

    likeBlog({...blog, likes: blog.likes+1, user: blog.user.id})
  }

  const deleteObject = (event) => {
    event.preventDefault()

    if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)){
      deleteBlog(blog.id)
    }
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> </p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={like}>like</button></p>
      <p>{blog.user.name}</p>
      {blog.user.username !== user.username ? null : <button onClick={deleteObject}>remove</button>}
    </div>
  </div>  
)}

export default Blog