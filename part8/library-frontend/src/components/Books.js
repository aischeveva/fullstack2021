import React from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const pageTitle = props.recommend ? 'recommendations' : 'books'

  if (!props.show || result.loading) {
    return null
  }

  const books = result.data.allBooks

  let genres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if(!genres.includes(genre)){
        genres = genres.concat(genre)
      }
    })
  })

  let filteredBooks = books
  if(props.genre !== ''){
    filteredBooks = books.filter(b => b.genres.includes(props.genre))
  }

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
          {filteredBooks.map(b =>
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