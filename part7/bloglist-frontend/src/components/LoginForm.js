import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('logging in with', event.target.username.value, event.target.password.value)
        dispatch(login(event.target.username.value, event.target.password.value))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>username:</Form.Label>
                <Form.Control type="text" name="username" />
                <Form.Label>password:</Form.Label>
                <Form.Control type="password" name="password" />
                <Button variant="primary" type="submit">login</Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm