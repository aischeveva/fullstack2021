import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'


const Comments = ({ comments, id }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleComment = (event) => {
        event.preventDefault()
        dispatch(addComment(id, comment))
        setComment('')
    }

    return (
        <div>
            <h3>Comments</h3>
            <form onSubmit={ handleComment }>
                <input id="comment" type="text" value={ comment } onChange={({ target }) => setComment(target.value)}></input>
                <button id="submit-button" type="submit">add comment</button>
            </form>
            <ul>
                { comments.map((comment, idx) => (
                    <li key={ idx }>{ comment }</li>
                )) }
            </ul>
        </div>
    )
}

export default Comments