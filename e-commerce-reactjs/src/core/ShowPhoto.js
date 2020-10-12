import React from 'react'
import { API_URL } from '../config'

function ShowPhoto({ item, url, className }) {

    return (
        <div>
            <img width="150px" className={className} src={`${API_URL}/${url}/${item._id}`} alt={`${item._id}`} />
        </div>
    )
}

export default ShowPhoto
