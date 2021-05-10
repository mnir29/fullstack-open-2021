import React from 'react'

const Notification = ({ message, status }) => {
  if (message === null || status === null) {
    return null
  }

  return (
    <div className={status}>
      {message}
    </div>
  )
}

export default Notification