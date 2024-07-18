import { useState } from 'react'

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function addGood() {
    setGood(prev => prev + 1);
  }
  function addNeutral() {

    setNeutral(prev => prev + 1);
  }
  function addBad() {
    setBad(prev => prev + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={addGood} text="good" />
        <Button handleClick={addNeutral} text="neutral" />
        <Button handleClick={addBad} text="bad" />
      </div>
      <h1>give feedback</h1>
      {(good > 0 || neutral > 0 || bad > 0) ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
    </div >
  )
}

function Button({ handleClick, text }) {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function Statistics({ good, neutral, bad }) {
  return (
    <table>
      <tbody>
        <StatisticLine title="good" value={good} />
        <StatisticLine title="neutral" value={neutral} />
        <StatisticLine title="bad" value={bad} />
        <StatisticLine title="total" value={good + neutral + bad} />
        <StatisticLine title="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine title="average" value={good / (good + neutral + bad)} />
      </tbody>
    </table>
  )
}

function StatisticLine({ title, value }) {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App
