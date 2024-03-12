import { useState } from 'react'

const Statistics = ({ g, b, n }) => {
  const total = g + b + n
  const average = (g-b) / total
  const positive = g/total *100 + "%"
  if (total >0){
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
          
            <StatisticLine text="Good" value={g}/>
           
            <StatisticLine text="Neutral" value={n}/>
         
            <StatisticLine text="Bad" value={b}/>
         
            <StatisticLine text="Total" value={total}/>
          
            <StatisticLine text="Average" value={average}/>
          
            <StatisticLine text="Positive" value={positive}/>
           
          </tbody>
        </table>
        
      </div>
    )
  }
  else{
    return(
      <div>
      <h1>Statistics</h1>
      <p> No feedback given</p>
      </div>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return(
    <tr>
    <td>{text}</td><td>{value}</td>
    </tr>
  )
}


const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
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
          
          <Button handleClick={() => setGood(good+1)} text="Good"/>
          <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
          <Button handleClick={() => setBad(bad + 1)} text="Bad" />
        </div>
        <Statistics g={good} n={neutral} b={bad}/>

    </div>
  )
}

export default App