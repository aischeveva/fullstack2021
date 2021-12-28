import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.data]
        case 'LIKE':
            return state.map(blog => blog.id !== action.data.id ? blog : action.data)
        case 'DELETE':
            return state.filter(blog => blog.id !== action.data)
        case 'INIT':
            return action.data
        default:
            return state
    }
}

export const addBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD',
            data: newBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.updateLikes(blog)
        dispatch({
            type: 'LIKE',
            data: newBlog
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE',
            data: id
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export default reducer