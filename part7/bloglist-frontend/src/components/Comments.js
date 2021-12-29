import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import { Form, Button, InputGroup } from 'react-bootstrap'


const Comments = ({ comments, id }) => {
    const dispatch = useDispatch()

    const handleComment = (event) => {
        event.preventDefault()
        dispatch(addComment(id, event.target.comment.value))
    }

    return (
        <div>
            <h3>Comments</h3>
            <Form onSubmit={ handleComment }>
                <Form.Group>
                    <InputGroup>
                        <Form.Control type="text" name="comment" />
                        <Button type="submit">add comment</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            <ul>
                { comments.map((comment, idx) => (
                    <li key={ idx }>{ comment }</li>
                )) }
            </ul>
        </div>
    )
}

export default Comments