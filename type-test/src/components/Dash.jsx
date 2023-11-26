import React from 'react'
import { useState, useEffect } from 'react'

const Dash = () => {
  
  return (
    <>
    <div className='flex h-[60vh] pt-[20vh] w-[100vw] justify-center'>
      <div className='flex justify-center text-white font-roboto grid grid-cols-3 h-[80vh] w-[20vw] mr-8'>

        <div className='flex grid grid-rows-2 gap-0 h-[60vh]'>
            <div className='h-[25vh] w-[35vh] border-2 rounded-2xl'>
              <h className='font-roboto grid grid-cols-2'>
                <div className='text-[15vh] px-10'>69</div>
                <div className='text-[4vh] py-[15vh] px-10'>wpm</div>
              </h>
            </div>

            <div className='flex h-[25vh] w-[35vh] border-2 rounded-2xl'>
            <h className='font-roboto grid grid-cols-2'>
                <div className='text-[15vh] px-10'>69<h className='text-[4vh]'>%</h></div>
                <div className='text-[4vh] py-[17vh] px-10'>acc</div>
              </h>
            </div>
          </div>
      </div>

      <div className='h-[55vh] w-[50vw] border-2 rounded-2xl'>
        <div className='text-white font-roboto'>
          chart area
        </div>
      </div>

      <button className='h-[55vh] w-[5vw] border-2 rounded-2xl justify-center ml-8 text-white hover:bg-white transition-all hover:ease-in-out hover:text-black'>
        <div className='rotate-[90deg]'>
          <h className='font-roboto text-[3vh] rotate-[90deg]'>Check Ranking</h>
          </div>
      </button>
    
    </div>
    
    <div className='flex justify-center w-screen'>
      <div className='flex border-2 rounded-2xl h-[80vh] w-screen backdrop-blur-xl'>
          <div className='flex justify-center w-full'>
            <h className='flex font-roboto text-[7vh] text-white'>RANKINGS</h>
          </div>
      </div>
    </div>
    
  </> 
  )
}

export default Dash