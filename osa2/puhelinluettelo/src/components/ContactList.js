import React from 'react'

const ContactList = ({persons, handleDelete, filterText}) => {
  return (
    <div>
      {/* If filter text is given, names will be filtered caseinsensitively.
      If filter text is not given, all names will be shown */}
      {filterText !== '' ?
      (persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())).map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number} <button onClick={(event) => handleDelete(event, person.id, person.name)}>delete</button>
          </p>
        )
      }))
      :
      (persons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number} <button onClick={(event) => handleDelete(event, person.id, person.name)}>delete</button>
          </p>
        )
      }))}
    </div>
  )
}

export default ContactList