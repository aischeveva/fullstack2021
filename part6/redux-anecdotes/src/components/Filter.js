import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        event.preventDefault()
        props.updateFilter(event.target.value.toLowerCase())
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    updateFilter
}

export default connect(null, mapDispatchToProps)(Filter)