import React from 'react'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            username <input id="username" type="text" value={username} name="Username" onChange={handleUsernameChange} />
            </div>
            <div>
            password <input id="password" type="password" value={password} name="Password" onChange={handlePasswordChange} />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm