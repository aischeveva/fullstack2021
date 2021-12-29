import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const initialState = {
    user: null,
    users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN':
            return { ...state, username: '', password: '', user: action.data }
        case 'LOGOUT':
            return initialState
        case 'SET_USER':
            return { ...state, username: '', password: '', user: action.data }
        case 'INIT_USERS':
            return { ...state, users: action.data }
        default:
            return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const loggedUser = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            blogService.setToken(loggedUser.token)
            dispatch({
                type: 'LOGIN',
                data: loggedUser
            })
            dispatch(setNotification({ message: `successfully logged in as ${loggedUser.name}`, type: 'success' }, 5))
        } catch (error) {
            console.error(error)
            dispatch(setNotification({ message: 'wrong password or username', type: 'error' }, 5))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const setUser = (loggedUserJSON) => {
    return async dispatch => {
        const loggedUser = JSON.parse(loggedUserJSON)
        blogService.setToken(loggedUser.token)
        dispatch({
            type: 'SET_USER',
            data: loggedUser
        })
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

export default reducer