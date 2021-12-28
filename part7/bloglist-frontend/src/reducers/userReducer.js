import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {
    username: '',
    password: '',
    user: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'UPDATE_NAME':
            return {...state, username: action.data}
        case 'UPDATE_PASS':
            return {...state, password: action.data}
        case 'LOGIN':
            return { username: '', password: '', user: action.data }
        case 'LOGOUT':
            return initialState
        case 'SET_USER':
            return { username: '', password: '', user: action.data }
        default:
            return state
    }
}

export const updateUsername = (username) => {
    return async dispatch => {
        dispatch({
            type: 'UPDATE_NAME',
            data: username
        })
    }
}

export const updatePassword = (password) => {
    return async dispatch => {
        dispatch({
            type: 'UPDATE_PASS',
            data: password
        })
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

export default reducer