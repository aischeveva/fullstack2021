import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)

    const [ notification, setNotification ] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs => setBlogs( blogs ))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUser(user)
            console.log(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            notifyWith(`successfully logged in as ${user.name}`)
        } catch (exception) {
            notifyWith('wrong password or username', 'error')
        }
    }

    const addBlog = (newBlog) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                notifyWith(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            })
    }

    const likeBlog = (newBlog) => {
        blogService
            .updateLikes(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
                notifyWith(`liked ${returnedBlog.title} by ${returnedBlog.author}`)
            })
    }

    const deleteBlog = (id) => {
        blogService
            .deleteBlog(id)
            .then(() => {
                setBlogs(blogs.filter(blog => blog.id !== id))
                notifyWith('successfully deleted')
            })
    }

    const handleLogout = (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem('loggedUser')
        notifyWith('successfully logged out')
    }

    const notifyWith = (message, type='success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const loginForm = () => (
        <div>
            <h2>log in to application</h2>
            <Notification notification={notification} />
            <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} handleSubmit={handleLogin} />
        </div>
    )

    const blogForm = () => (
        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Toggleable>
    )

    const blogList = () => (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <br />
            {blogForm()}
            {blogs.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1)).map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} user={user} deleteBlog={deleteBlog} />
            )}
        </div>
    )

    return (
        <div>
            {user === null && loginForm()}
            {user !== null && blogList()}
        </div>
    )
}

export default App