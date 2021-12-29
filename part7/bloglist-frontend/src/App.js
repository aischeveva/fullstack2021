import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Header from './components/Header'
import Navigation from './components/Navigation'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, logout, initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.userInfo.user)

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
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
            {blogForm()}
            {blogs.sort((b1, b2) => (b1.likes < b2.likes ? 1 : -1)).map(blog =>
                (<div key={blog.id} className='blog-link'>
                    <Link to={`/blogs/${blog.id}`}>{ blog.title } { blog.author }</Link>
                </div>)
            )}
        </div>
    )

    const routerPart = () => (
        <Router>
            <Navigation username={ user.name } handleLogout={ handleLogout } />
            <Header />
            <Switch>
                <Route path="/users/:id">
                    <User />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/blogs/:id">
                    <Blog user={user} />
                </Route>
                <Route path="/">
                    <div>
                        { blogList() }
                    </div>
                </Route>
            </Switch>
        </Router>
    )

    return (
        <div className="container">
            {user === null && loginForm()}
            {user !== null && routerPart()}
        </div>
    )
}

export default App