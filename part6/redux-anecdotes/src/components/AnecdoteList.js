import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => 
        state.filter === '' ? 
            state.anecdotes : 
            state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter)))
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`)) 
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000) 
    }

    return (
        <div>
            {anecdotes.sort((e1, e2) => (e1.votes < e2.votes)).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList