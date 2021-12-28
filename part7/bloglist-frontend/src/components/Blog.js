import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
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
        dispatch(likeBlog({ ...blog, likes: blog.likes+1, user: blog.user.id }))
        dispatch(setNotification({ message: `liked ${blog.title} by ${blog.author}`, type: 'success' }, 5))
    }

    const deleteObject = (event) => {
        event.preventDefault()
        if(window.confirm(`Do you want to delete ${blog.title} by ${blog.author}?`)){
            dispatch(deleteBlog(blog.id))
            dispatch(setNotification({ message: 'successfully deleted', type: 'success' }, 5))
        }
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="collapsedBlog">
                {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} className="expandedBlog">
                <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> </p>
                <p>{blog.url}</p>
                <p className="likes" >likes {blog.likes} <button onClick={like}>like</button></p>
                <p>{blog.user.name}</p>
                {blog.user.username !== user.username ? null : <button onClick={deleteObject}>remove</button>}
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default Blog