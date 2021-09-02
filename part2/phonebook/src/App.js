import React, { useState, useEffect } from 'react'
import Error from './components/Error'
import Notification from './components/Notification'
import Numbers from './components/Numbers'
import Filter from './components/Filter'
import Form from './components/Form'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(data => {setPersons(data)})
  }, [])
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.find(person => person.name === newName)){
      if(window.confirm(`Do you really want to update phone number for ${newName}?`)){
        personService
          .update(persons.find(person => person.name === newName).id, newPerson)
          .then(data => {
            setNewName('')
            setNewNumber('')
            setPersons(persons.map(person => person.name === newName ? data : person))
            setNotification(`Updated number for ${newName}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(() => {
            setError(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setError(null)
            }, 5000)
          })
      }
    } else 
    {
      personService
        .create(newPerson)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setNotification(`Added ${newName} to the phonebook`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => alert(`Error ${error} occured!`))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    if(window.confirm(`Do you really want to delete ${persons.find(person => person.id===id).name} from the phonebook?`)){
      personService
      .deletePerson(id)
      .then(() => {
        setNotification(`Deleted ${persons.find(person => person.id===id).name} from the phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => alert(`Error ${error} occured!`))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Numbers persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App