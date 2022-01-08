import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { USER, BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [recommend, setRecommend] = useState(false)
  const [genre, setGenre] = useState('')
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      console.log('updating cache')
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`A book ${book.title} by ${book.author.name} has been added!`)
      updateCacheWith(book)
    }
  })

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
        updateCacheWith={updateCacheWith}
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