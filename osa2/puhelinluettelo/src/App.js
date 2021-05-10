
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

  const handleAdd = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const personFound = persons.find(person => person.name === newName)
    if (personFound === undefined) {
      personService
        .create(newPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
          })
    } else {
      const changedPerson = {...personFound, number: newNumber}
      if (window.confirm(`${personFound.name} is already added to phonebook, replace number with new one?`)) {
        personService
          .updateNumber(personFound.id, changedPerson)
            .then(updatedPerson => {
              console.log(updatedPerson)
              setPersons(persons.map(person => person.id !== personFound.id ? person : updatedPerson))
            })
            .catch(error => {
              alert(
                `Person ${personFound.name} has already been deleted from server`
              )
              setPersons(persons.filter(person => person.id !== personFound.id))
            })
      }
    }
    
    setNewName('')
    setNewNumber('')
  
  }

  const handleDelete = (event, id, name) => {
    event.preventDefault()
    if (window.confirm(`Do you really want to delete contact: ${name}?`)) {
      personService
      .deletePerson(id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `Person ${name} has already been deleted from server`
          )
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    
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
        handleAdd={handleAdd}
        updateNewName={updateNewName}
        newName={newName}
        updateNewNumber={updateNewNumber}
        newNumber={newNumber}
      />
      
      <h3>Names and numbers</h3>
      
      <ContactList 
        persons={persons}
        handleDelete={handleDelete}
        filterText={filterText}
      />
      
    </div>
  )

}

export default App
