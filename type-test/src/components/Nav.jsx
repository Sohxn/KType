import React from 'react'
import '../App.css'
import prof from '../assets/icons/prf.svg'
import set from '../assets/icons/set.svg'
import tr from '../assets/icons/TRicon.png'
import cbp from '../assets/icons/prf.png'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'


const Nav = () => {

  const [sbopen, setsbopen] = useState(false)

  const sbtoggle = () =>
  {
    setsbopen(!sbopen)
  }

  //escape to close sidebar
  useEffect(() => {
    const HandleKeyDown = (event) => {
      if(sbopen && event.key === 'Escape'){
        sbtoggle() 
      }
      if(!sbopen && event.key === 'Shift'){
        sbtoggle()
      }
    }

  document.addEventListener('keydown' , HandleKeyDown)

  return () => {
    document.removeEventListener('keydown' , HandleKeyDown)
    }
  },
  [sbopen, sbtoggle])
  
  return (
    <div  className='fixed flex h-[12vh] w-screen justify-center'>
        <div className='mt-6 rounded-lg w-[90vw] flex'>
          <h className='font-roboto text-[4vh] text-white hover:cursor-pointer self-center'>TypeRabbit. </h>
        </div>

        <div id='buttontoopensidebar' className='text-white font-roboto fixed flex cursor-pointer right-10 top-10'>
          {sbopen ? (
           <></>
          ) : (
            <>  
            <button className="rounded-full h-12 w-12 border-4 border-blue-300 ease-in-out duration-500">
              <img src={cbp} className='rounded-full' onClick={sbtoggle}/>
            </button>
            </>
            )}
          {/*sidebar*/} 
          <div className={`top-0 right-0 lg:w-[20vw] md:w-screen sm:w-screen bg-gray-900 p-10 pl-20 text-white fixed h-full z-40 rounded-2xl ease-in-out duration-500 ${
                sbopen ? "translate-x-0" : "translate-x-full"
          }`}>
          {/*parent div of sidebar elements*/}
          <div className='font-roboto'>
              <div className='text-4xl mb-[5vh] text-center'><span>NAME</span></div>
              <ul className='mb-[75vh]'>
                <li className='flex justify-center'>
                  <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/dashboard"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 border-white text-center mb-[3vh]'>DASH</div></Link></button>
                </li>
                <li className='flex justify-center'>
                <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/login"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 text-center border-white mb-[3vh]'>LOGIN / SIGNUP</div></Link></button>
                </li>
                <li className='flex justify-center'>
                <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 text-center border-white mb-[3vh]'>TYPE</div></Link></button>
                </li>
              </ul>
              {/* <div>
                  PRESS <span className='border-2 rounded-md p-1'>ESC</span> TO CLOSE
              </div> */}
          </div>
          </div>
        </div>
       
    </div>
  )
}

export default Nav
/*shadow-[0px_0px_50px_4px_#2d3748]*/