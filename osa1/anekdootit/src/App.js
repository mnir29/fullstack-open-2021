import React, { useState } from 'react'

// Component for anecdotes with header and points
const Anecdote = ({header, text, points}) => {
  return (
    <div>
      <h1>{header}</h1>
      <p>
        {text}
        <br />
        has {points} votes
      </p>
    </div>
  )
}

// Component for buttons
const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  return (
    <div>
      <Anecdote header='Anecdote of the day' text={anecdotes[selected]} points={points[selected]} />
      <Button clickHandler={addVote} text='vote' />
      <Button clickHandler={randomAnecdote} text='next anecdote' />
      <Anecdote header='Anecdote with most votes' text={anecdotes[points.indexOf(Math.max(...points))]} points={Math.max(...points)} />
    </div>
  )
}

export default App