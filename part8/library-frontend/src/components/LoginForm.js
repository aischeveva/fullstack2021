import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data, setToken])

    if (!show || result.loading) {
        return null
      }

    const submit = async (event) => {
        event.preventDefault()
        login({ variables: { username, password } })
        setPage('authors')
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username
                    <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    password
                    <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm