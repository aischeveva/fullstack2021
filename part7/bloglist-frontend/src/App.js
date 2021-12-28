import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const userInfo = useSelector(state => state.userInfo)

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            dispatch(setUser(loggedUserJSON))
        }
    }, [])


    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(logout())
        dispatch(setNotification({ message: 'successfully logged out', type: 'success' }, 5))
    }

    const loginForm = () => (
        <div>
            <h2>log in to application</h2>
            <Notification />
            <LoginForm />
        </div>
    )

    const blogForm = () => (
        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
        </Toggleable>
    )

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <Notification />
            <p>{userInfo.user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <br />
            {blogForm()}
            {blogs.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1)).map(blog =>
                <Blog key={blog.id} blog={blog} user={userInfo.user} />
            )}
        </div>
    )

    return (
        <div>
            {userInfo.user === null && loginForm()}
            {userInfo.user !== null && blogList()}
        </div>
    )
}

export default App