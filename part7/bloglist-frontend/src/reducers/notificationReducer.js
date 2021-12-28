let timeoutID

const reducer = (state = {message: '', type: 'success'}, action) => {
    switch(action.type){
        case 'SET':
            return action.data.notification
        case 'REMOVE':
            return {message: '', type: 'success'}
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return dispatch => {
        if (timeoutID !== undefined){
            clearTimeout(timeoutID)
        }
        dispatch({
            type: 'SET',
            data: { notification }
        })

        timeoutID = setTimeout(() => {
            dispatch(removeNotification())
        }, time*1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer