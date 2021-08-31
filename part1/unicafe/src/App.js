import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value, percentage}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{percentage}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const computeAll = () => (good + neutral + bad)
  const computeAverage = () => ((good - bad)/computeAll())
  const computeRatio = () => (100*(good/computeAll()))

  if(computeAll() === 0){
    return (
      <div>
        <Header text="Statistics"/>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <Header text="Statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} percentage="" />
          <StatisticLine text="neutral" value={neutral} percentage="" />
          <StatisticLine text="bad" value={bad} percentage="" />
          <StatisticLine text="all" value={computeAll()} percentage="" />
          <StatisticLine text="average" value={computeAverage()} percentage="" />
          <StatisticLine text="positive" value={computeRatio()} percentage=" %" />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
    
  return (
    <div>
      <Header text="Give Feedback" />
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
