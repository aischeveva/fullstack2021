import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('< Blog />', () => {
    let component
    let likeBlog
    let deleteBlog

    const blog = {
        id: '615c7921e341def5dfe3d85e',
        title: '4 Reasons Why You Shouldn’t Use Machine Learning',
        author: 'Terence Shin',
        url: 'https://towardsdatascience.com/4-reasons-why-you-shouldnt-use-machine-learning-639d1d99fe11',
        likes: 4,
        user: {
            id:'615bfef0a0f23a5ab17c71bd',
            username: 'alena',
            name: 'Alena'
        }
    }

    const user = {
        id:'615bfef0a0f23a5ab17c71bd',
        username: 'alena',
        name: 'Alena'
    }

    beforeEach(() => {
        likeBlog = jest.fn()
        deleteBlog = jest.fn()
        component = render(
            <Blog blog={blog} likeBlog={likeBlog} user={user} deleteBlog={deleteBlog} />
        )
    })

    test('shows title and author only when collapsed', () => {

        const div = component.container.querySelector('.collapsedBlog')
        expect(div).toHaveTextContent('4 Reasons Why You Shouldn’t Use Machine Learning Terence Shin')
        expect(div).not.toHaveStyle('display: none')
        expect(component.container.querySelector('.expandedBlog')).toHaveStyle('display: none')
    })

    test('shows url and number of likes when expanded', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.expandedBlog')
        expect(div).not.toHaveStyle('display: none')
    })

    test('event handler called twice when like button pressed twice', () => {
        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})
