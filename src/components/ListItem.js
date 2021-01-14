import React from 'react'

const ListItem = ({ item, title }) => {
    return (
        <p>
            <span>{title}</span>
            <span>{item}</span>
        </p>
    )
}

export default ListItem
