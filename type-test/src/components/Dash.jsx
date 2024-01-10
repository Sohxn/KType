import React from 'react'
import { useState, useEffect } from 'react'

const Dash = () => {

  const [rankOpen, setrankOpen] = useState(false)
  
  const openRanks = () =>
  {
    setrankOpen(!rankOpen)
  }


  return (
   <>
    <div className='flex h-screen w-screen justify-center'>
      {/* div with imaginary border that was pre calculated lmao */}
      <div className='w-[60vw] h-[75vh] m-[10vw] mt-[15vh] rounded-3xl'>
        {/*Masonry layout*/}
        <div className="grid grid-cols-3 gap-10 p-4"  style={{ gridTemplateRows: 'auto auto' }}>
          <div className="grid-item border-2 h-[35vh] rounded-[20px] text-white">
            will add later
          </div>
          <div className="grid-item h-[35vh] rounded-[20px] gap-8 text-white" style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
            <div className='row-item border-2 rounded-[20px]'></div>
            <div className='row-item border-2 rounded-[20px]'></div>
          </div>

          <div className="grid-item border-2 row-span-2 rounded-[20px] text-white">
            
          </div>
          <div className="grid-item border-2 h-[30vh] col-span-2 rounded-[20px] text-white">
            
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Dash