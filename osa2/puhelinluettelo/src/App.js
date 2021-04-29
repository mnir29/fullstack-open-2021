import React, { useState } from 'react'

const App = () => {
  const [ filterText, setFilterText ] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const handleNameSubmit = (event) => {
    event.preventDefault()
    persons.find(person => person.name === newName) === undefined 
    ?
    (setPersons(persons.concat({name: newName, number: newNumber})))
    :
    (alert(`${newName} is already added to phonebook`)) 
    
    setNewName('')
    setNewNumber('')
  }

  const updateFilterText = (event) => {
    setFilterText(event.target.value)
  }

  const updateNewName = (event) => {
    setNewName(event.target.value)
  }

  const updateNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={updateFilterText} value={filterText} />
      </div>
      <form onSubmit={handleNameSubmit}>
        <h3>add a new contact</h3>
        <div>
          name: <input onChange={updateNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={updateNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Names and numbers</h3>
      
      {/* If filter text is given, names will be filtered caseinsensitively.
      If filter text is not given, all names will be shown */}
      {filterText !== '' ?
      (persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())).map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      }))
      :
      (persons.map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      }))
      }
    </div>
  )

}

export default App
