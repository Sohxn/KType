import React from 'react'
import { useState } from 'react'
import '../App.css'

const ResultOverlay = (children) => {
  
    const [isOpen , setOpen] = useState(false)
    
    //functions to open and close the session result overlay
    const overlayopen = () => {
        setOpen(true)
    }

    const overlayclose = () => {
        setOpen(false)
    }

  return (
    <div className='fixed backdrop-blur-3xl font-roboto bg-transparent top-0 left-0 w-full h-full z-50 in-ease-out duration-300 bg-black ease-in-out'>
        <span className='flex text-white p-2'>press &nbsp; <span className='border-2 rounded-lg text-center'>&nbsp; ctrl + R &nbsp;</span> &nbsp;to type again</span>
        <div>
            
        </div>
    </div>
  )
}

export default ResultOverlay