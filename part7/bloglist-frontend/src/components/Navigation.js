import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = ({ username, handleLogout }) => {
    const padding = {
        paddingRight: 5
    }

    return (
        <div className="navbar">
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
            {username} logged in &nbsp;
            <button style={padding} onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Navigation