
import React, { useState, useEffect } from 'react'
import FilterTool from './components/FilterTool'
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"
import personService from "./services/persons"

const App = () => {
  const [ filterText, setFilterText ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    persons.find(person => person.name === newName) === undefined 
    ?
    (
      
      personService
        .create(newPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
          })

      //setPersons(persons.concat({name: newName, number: newNumber}))
    )
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
