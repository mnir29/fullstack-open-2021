import React, { useState } from 'react'

const Button = ({clickHandler, text}) => <button onClick={clickHandler}>{text}</button>

const Count = ({text, count}) => <p>{text} {count}</p>

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
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
      <Header text='Statistics' />
      <Count text='good' count={good} />
      <Count text='neutral' count={neutral} />
      <Count text='bad' count={bad} />
    </div>
  )
}

export default App
