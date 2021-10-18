const reducer = (state = '', action) => {
    switch(action.type){
        case 'SET':
            return action.data.notification
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export const setNotification = (notification, time) => {
    return dispatch => {
        dispatch({
            type: 'SET',
            data: { notification }
        })
        
        setTimeout(() => {
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