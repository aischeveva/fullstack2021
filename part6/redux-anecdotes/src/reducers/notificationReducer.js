const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type){
        case 'SET':
            return action.data.notification
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export const setNotification = (notification) => {
    return {
        type: 'SET',
        data: { notification }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE'
    }
}

export default reducer