import React from 'react'

const Person = ({ person, handleDelete }) => {
    return (
      <li>{person.name} {person.number} <button onClick={handleDelete} >delete</button></li>
    )
  }
  
const Numbers = ({ persons, handleDelete }) => {
    return (
        <ul>
        {persons.map(person => <Person key={person.name} person={person} handleDelete={() => handleDelete(person.id)} />)}
        </ul>
    )
}

  export default Numbers