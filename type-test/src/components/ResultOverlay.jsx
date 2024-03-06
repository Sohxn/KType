import React from 'react'
import { useState } from 'react'

const ResultOverlay = (children, isVisible) => {
  
    const [isOpen , setOpen] = useState(isVisible)
    
    //functions to open and close the session result overlay
    const overlayopen = () => {
        setOpen(true)
    }

    const overlayclose = () => {
        setOpen(false)
    }

  return (
    <div>ResultOverlay</div>
  )
}

export default ResultOverlay