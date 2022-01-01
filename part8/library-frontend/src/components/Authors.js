import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ year, setYear ] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show || result.loading) {
    return null
  }

  const authors = result.data.allAuthors
  const options = authors.map(author =>  ({value: author.name, label: author.name}))

  const updateAuthor = (event) => {
    event.preventDefault()
    console.log(name)
    editAuthor({ variables: { name: name.value, setBornTo: Number(year) } })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          born: <input name="year" type="text" value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type="submit" >update author</button>
      </form>

    </div>
  )
}

export default Authors
