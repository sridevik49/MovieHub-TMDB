import React from 'react'
import {Button} from "../Button"
import "./index.scss"
const index = ({currentPage, totalPages,handleNext, handlePrev}) => {
  return (
    <div className='pagination'>
        <Button onClick={handlePrev} text = "Prev"/>
        <span>{currentPage}/{totalPages}</span>
        <Button onClick={handleNext} text = "Next"/>
    </div>
  )
}

export default index