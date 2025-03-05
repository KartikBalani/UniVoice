import React from 'react'
import './card.css'

const card = ({description , article}) => {
  return (
        <div className="card">
           <p>{description}</p>
           <p>{article}</p>
        </div>
  )
}

export default card
