import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('input form passes correct data on submit', () => {
    const createBlog = jest.fn()
    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: '4 Reasons Why You Shouldn’t Use Machine Learning' }
    })
    fireEvent.change(author, {
        target: { value: 'Terence Shin' }
    })
    fireEvent.change(url, {
        target: { value: 'https://towardsdatascience.com/4-reasons-why-you-shouldnt-use-machine-learning-639d1d99fe11' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('4 Reasons Why You Shouldn’t Use Machine Learning')
    expect(createBlog.mock.calls[0][0].author).toBe('Terence Shin')
    expect(createBlog.mock.calls[0][0].url).toBe('https://towardsdatascience.com/4-reasons-why-you-shouldnt-use-machine-learning-639d1d99fe11')
})