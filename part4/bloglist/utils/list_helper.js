const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((sum, current) => ({likes: sum.likes + current.likes})).likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {title: '', author: '', likes: ''}
    const favourite = blogs.reduce((previous, current) => ((previous.likes > current.likes ? previous : current)))
    const blog = {
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes
    }
    return blog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {author: '', blogs: 0}
    const groupped = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => ({author: key, blogs: value.length}))
        .value()
    const most = groupped.reduce((previous, current) => ((previous.blogs > current.blogs ? previous : current)))
    return most
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {author: '', likes: 0}
    const groupped = _.chain(blogs)
        .groupBy('author')
        .map((value, key) => ({author: key, likes: value.reduce((sum, current) => ({likes: sum.likes + current.likes})).likes}))
        .value()
    const most = groupped.reduce((previous, current) => ((previous.likes > current.likes ? previous : current)))
    return most
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}