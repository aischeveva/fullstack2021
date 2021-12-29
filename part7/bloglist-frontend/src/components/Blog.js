import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const Blog = ({ user }) => {
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))
    const dispatch = useDispatch()

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

    if(!blog) {
        return null
    }

    return (
        <div>
            <h1>{ blog.title } { blog.author }</h1>
            <p>{blog.url}</p>
            <p className="likes" >likes {blog.likes} <button onClick={like}>like</button></p>
            <p>added by {blog.user.name}</p>
            {blog.user.username !== user.username ? null : <button onClick={deleteObject}>remove</button>}
            <Comments comments={ blog.comments } id={ blog.id } />
        </div>
    )
}

Blog.propTypes = {
    user: PropTypes.object.isRequired,
}

export default Blog