import React from 'react'
import '../App.css'
import prof from '../assets/icons/prf.svg'
import set from '../assets/icons/set.svg'
import tr from '../assets/icons/TRicon.png'
import { useState } from 'react'
import {Link} from 'react-router-dom'


const Nav = () => {
  const [ddOpen , setddOpen] =  useState(false)  //initial value is set to false

  const prfopen = () =>
  {
    setddOpen(!ddOpen)
  }


  
  return (
    <div className='fixed flex h-[12vh] w-screen justify-center'>
      <div className='mt-6 rounded-lg w-[70vw] flex container'>
        <img className='h-14 w-14 self-center' src={tr}/>
        <h className='font-roboto text-[5vh] text-white ml-[1vw] hover:cursor-pointer self-center'>TypeRabbit. </h>

        
        <div className='flex  space-x-6 ml-auto mr-6'>
          <div className='w-12 h-12 self-center'><img src={set}/></div>
          
          <div id='profile' className='w-12 h-12 self-center relative' >
            <button id='dropdownHoverButton' onClick={prfopen}><img className='h-fill w-fill' src={prof}/></button>
            <div className={`prfdd absolute mt-[3vh] bg-opacity-20 border-2 rounded-xl w-fit h-fit p-4 ${ddOpen ? '' : 'hidden'}`}>
              <Link to="/dashboard" className="block px-4 py-2 text-white font-roboto hover:border-2 hover:rounded-xl">Dashboard</Link>

              <Link to="/login" className="block px-4 py-2 text-white font-roboto hover:border-2 hover:rounded-xl">Log in</Link>
              <Link to="/" className="block px-4 py-2 text-white font-roboto hover:border-2 hover:rounded-xl">Type</Link>
          
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Nav