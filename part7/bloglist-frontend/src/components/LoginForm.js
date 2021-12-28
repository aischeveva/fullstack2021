import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername, updatePassword, login } from '../reducers/userReducer'

const LoginForm = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfo)

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('logging in with', userInfo.username, userInfo.password)
        dispatch(login(userInfo.username, userInfo.password))
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
            username <input id="username" type="text" value={userInfo.username} name="Username" onChange={({ target }) => dispatch(updateUsername(target.value))} />
            </div>
            <div>
            password <input id="password" type="password" value={userInfo.password} name="Password" onChange={({ target }) => dispatch(updatePassword(target.value))} />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm