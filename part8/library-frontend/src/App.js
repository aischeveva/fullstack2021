import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import { USER } from './queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [recommend, setRecommend] = useState(false)
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  const user = useQuery(USER)

  if(user.loading){
    return null
  }

  const userGenre = user.data.me ? user.data.me.favoriteGenre : null

  const handleRecommend = () => {
    setPage('books')
    setGenre(userGenre)
    setRecommend(true)
  }

  const handleAllBooks = () => {
    setPage('books')
    setGenre('')
    setRecommend(false)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={handleAllBooks}>books</button>
        <button style={ {display: !token ? 'none' : null} } onClick={() => setPage('add')}>add book</button>
        <button style={ {display: !token ? 'none' : null} } onClick={handleRecommend}>recommend</button>
        <button style={ {display: token ? 'none' : null} } onClick={() => setPage('login')}>login</button>
        <button style={ {display: !token ? 'none' : null} } onClick={logout} >logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
        recommend={recommend}
        genre={genre}
        setGenre={setGenre}
      />

      <NewBook
        show={page === 'add' && token}
      />

      <LoginForm 
        show={page === 'login' && !token}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App