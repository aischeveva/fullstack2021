const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type){
        case 'UPDATE':
            return action.data.text
        default:
            return state
    }
}

export const updateFilter = (text) => {
    return {
        type: 'UPDATE',
        data: { text }
    }
}

export default reducer