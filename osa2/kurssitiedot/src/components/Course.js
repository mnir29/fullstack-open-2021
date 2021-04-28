import React from 'react'

const Header = ({name}) => {
  //console.log(name)
  return (
    <h2>{name}</h2>
  )
}

const Part = ({part}) => {
  //console.log(props)
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => {
        return <Part part={part} key={part.id}/>
      })}
    </div>
  )
}

const Total = ({ parts }) => {
  
  const sumOfParts = parts.reduce((sum, part) => {
    //console.log(sum, part)
    return sum + part.exercises
  }, 0)

  //console.log(sumOfParts)

  return (
    <p><strong>Total of {sumOfParts} exercises</strong></p>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course =>  {
        return (
          <div key={course.id}>
            {/* {console.log(course.name)} */}
            <Header name={course.name} />

            <Content 
              parts={course.parts}
            />

            <Total 
              parts={course.parts}
            />
          </div>
        )
      })}

    </div>
  )
}

export default Course