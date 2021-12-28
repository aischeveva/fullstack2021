import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        dispatch(addBlog({
            title: title,
            author: author,
            url: url
        }))
        dispatch(setNotification({ message: `a new blog ${title} by ${author} added`, type: 'success' }, 5))

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="blogForm">
            <h2>create new</h2>
            <form onSubmit={createBlog}>
                <div>
                    title: <input id="title" type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author: <input id="author" type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    url: <input id="url" type="text" value={url} name="URL" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button id="new-blog-button" type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm

