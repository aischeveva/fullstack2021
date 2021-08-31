import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const DisplayAnecdote = ({anecdote, votes}) => (
  <div>
    <p>{anecdote}</p>
    <DisplayVotes votes={votes} />
  </div>
)
const DisplayVotes = ({votes}) => <p>has {votes} votes</p>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const selectRandom = () => {
    const rand = Math.floor(Math.random()*anecdotes.length)
    setSelected(rand)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={vote} text="vote" />
      <Button handleClick={selectRandom} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <DisplayAnecdote anecdote={anecdotes[votes.indexOf(Math.max(...votes))]} votes={Math.max(...votes)} />
    </div>
  )
}

export default App
