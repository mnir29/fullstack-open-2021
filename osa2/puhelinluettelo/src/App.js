
import React, { useState, useEffect } from 'react'
import FilterTool from './components/FilterTool'
import ContactForm from "./components/ContactForm"
import ContactList from "./components/ContactList"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [ filterText, setFilterText ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ status, setStatus ] = useState(null)

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
            setMessage(
              `'${newName}' was added`
            )
            setStatus('success')
            setTimeout(() => {
              setMessage(null)
              setStatus(null)
            }, 5000)
            setPersons(persons.concat(returnedPerson))
          })
    } else {
      const changedPerson = {...personFound, number: newNumber}
      if (window.confirm(`${personFound.name} is already added to phonebook, replace number with new one?`)) {
        personService
          .updateNumber(personFound.id, changedPerson)
            .then(updatedPerson => {
              console.log(updatedPerson)
              setMessage(
                `'${updatedPerson.name}' number was updated`
              )
              setStatus('success')
              setTimeout(() => {
                setMessage(null)
                setStatus(null)
              }, 5000)
              setPersons(persons.map(person => person.id !== personFound.id ? person : updatedPerson))
            })
            .catch(error => {
              setMessage(
                `'${personFound.name}' has been deleted from server`
              )
              setStatus('error')
              setTimeout(() => {
                setMessage(null)
                setStatus(null)
              }, 5000)
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
          setMessage(
            `'${name}' was deleted`
          )
          setStatus('success')
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessage(
            `'${name}' has already been deleted from server`
          )
          setStatus('error')
          setTimeout(() => {
            setMessage(null)
            setStatus(null)
          }, 5000)
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

      <Notification message={message} status={status} />
      
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
