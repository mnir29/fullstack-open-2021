import React from 'react'

const ContactList = ({persons, filterText}) => {
  return (
    <div>
      {/* If filter text is given, names will be filtered caseinsensitively.
      If filter text is not given, all names will be shown */}
      {filterText !== '' ?
      (persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())).map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      }))
      :
      (persons.map((person) => {
        return <p key={person.name}>{person.name} {person.number}</p>
      }))}
    </div>
  )
}

export default ContactList