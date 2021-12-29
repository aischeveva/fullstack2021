import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const BlogForm = () => {
    const dispatch = useDispatch()

    const createBlog = (event) => {
        event.preventDefault()
        dispatch(addBlog({
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value
        }))
        dispatch(setNotification({ message: `a new blog ${event.target.title.value} by ${event.target.author.value} added`, type: 'success' }, 5))
    }

    return (
        <div className="blogForm">
            <h2>create new</h2>
            <Form onSubmit={createBlog}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control type="text" name="title"></Form.Control>
                    <Form.Label>author:</Form.Label>
                    <Form.Control type="text" name="author"></Form.Control>
                    <Form.Label>url:</Form.Label>
                    <Form.Control type="text" name="url"></Form.Control>
                    <Button variant="primary" type="submit">create</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm

