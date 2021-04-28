import React, { useState } from 'react'

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  )
}

const Statistics = ({counts}) => {
  const sum = counts.reduce((a,b) => a + b, 0)
  const average = ((counts[0] * 1) + (counts[2] * -1))/sum
  const positivePercentage = counts[0] / sum * 100

  return (
    <div>
      <Header text='Statistics' />
      {
        sum <= 0 ?
        (
          <p>No feedback given</p>
        )
        :
        (
          <div>
            <StatisticLine text='good' value={counts[0]} />
            <StatisticLine text='neutral' value={counts[1]} />
            <StatisticLine text='bad' value={counts[2]} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positivePercentage + ' %'} />
            {/* <p>average {average}</p>
            <p>positive {positivePercentage} %</p> */}
          </div>
        )
      }
    </div>
    
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1);
  }

  const addBad = () => {
    setBad(bad + 1);
  }

  const addNeutral = () => {
    setNeutral(neutral + 1);
  }

  return (
    <div>
      <Header text='Give feedback' />
      <Button clickHandler={addGood} text='good' />
      <Button clickHandler={addNeutral} text='neutral' />
      <Button clickHandler={addBad} text='bad' />
      <Statistics counts={[good, neutral, bad]} />
    </div>
  )
}

export default App
