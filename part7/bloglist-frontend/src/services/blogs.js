import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const updateLikes = async (newBlog) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
    return response.data
}

const updateComments = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, { comment: comment })
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, create, updateLikes, deleteBlog, updateComments }