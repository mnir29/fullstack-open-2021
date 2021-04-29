import React from 'react'

const ContactForm = ({handleSubmit, updateNewName, newName, updateNewNumber, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>    
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
  )
}

export default ContactForm