import React from 'react'
import "./index.scss"

const Input = ({type, placeholder, onChange, value}) => {
  return (
    <input type={type}
      value={value} 
      placeholder={placeholder} 
      onChange={onChange} 
      className='movie-input' />
  )
}

export default Input