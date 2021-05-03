
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterTool from './components/FIlterTool'
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"

const App = () => {
  const [ filterText, setFilterText ] = useState('')
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
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
      <FilterTool updateFilterText={updateFilterText} filterText={filterText} />
      
      <h3>Add a new contact</h3>
      <ContactForm 
        handleSubmit={handleSubmit}
        updateNewName={updateNewName}
        newName={newName}
        updateNewNumber={updateNewNumber}
        newNumber={newNumber}
      />
      
      <h3>Names and numbers</h3>
      
      <ContactList 
        persons={persons}
        filterText={filterText}
      />
      
    </div>
  )

}

export default App
