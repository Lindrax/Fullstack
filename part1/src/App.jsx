import { useState } from 'react'

const Statistics = ({ g, b, n }) => {
  const total = g + b + n
  const average = (g-b) / total
  const positive = g/total *100
  return(
    <div>
      <h1>Statistics</h1>
      <p>Good {g} </p>
      <p>Neutral {n}</p>
      <p>Bad {b}</p>
      <p>Total {total} </p>
      <p>Average {average}</p>
      <p>Positive {positive}% </p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h1>give feedback</h1>
        <div>
          
          <button onClick={() => setGood(good+1)}>
          Good
          </button>
          <button onClick={() => setNeutral(neutral+1)}>
          Neutral
          </button>
          <button onClick={() => setBad(bad+1)}>
          Bad
          </button>
        </div>
        <Statistics g={good} n={neutral} b={bad}/>

    </div>
  )
}

export default App