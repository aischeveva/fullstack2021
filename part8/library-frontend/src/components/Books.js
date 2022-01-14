import React, { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'

const Books = (props) => {
  const bookGenres = useQuery(ALL_GENRES)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])

  const pageTitle = props.recommend ? 'recommendations' : 'books'

  useEffect(() => {
    const genre = props.genre === '' ? null : props.genre
    getBooks({ variables: { genre: genre } })
  }, [props.genre, getBooks])

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!props.show || result.loading || bookGenres.loading) {
    return null
  }

  const genres = bookGenres.data.allGenres

  return (
    <div>
      <h2>{ pageTitle }</h2>
      <p style={ {display: !props.recommend ? 'none' : null} }>books in your favourite genre <b>{ props.genre }</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={ {display: props.recommend ? 'none' : null} } >
        { genres.map(g => (
          <button key={g} onClick={ () => props.setGenre(g) }>{g}</button>
        )) }
        <button onClick={ () => props.setGenre('') }>all genres</button>
      </div>
    </div>
  )
}

export default Books