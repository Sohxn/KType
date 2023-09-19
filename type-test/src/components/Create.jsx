import React from 'react'
import '../app.css'
import pattern from '../assets/vectors/backdrop_vector.svg'


const Create = () => {
  return (
    <div className='flex bg-black h-screen w-screen justify-center'>
      <div className='h-[65vh] bg-cover w-[24vw] border-4 rounded-[20px] mt-[20vh] justify-center grid grid-rows-3 outline-3' style={{ backgroundImage: `url(${pattern})` }}>
        <div id='logintitle' className='flex h-[6vh] w-[10vw] bg-white row rounded-[7px] font-roboto text-2xl text-center justify-center mt-[5vh] m-auto p-4'>
          <h className='flex self-center'>Join Us</h>
        </div>
        
        
        <div id="inputarea" className='h-[30vh] w-fit mb-auto mt-[-5vh] grid gap-8'>
           <input placeholder="Email" id="email" type="text" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <input placeholder="What should we call you?" id="username" type="text" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <input placeholder="Password" id="password" type="password" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <input placeholder="Retype Password" id="re" type="password" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <button className='bg-white rounded-[10px] font-roboto h-[5vh] mt-2'>Create Account</button>
        </div>
        
        
        
      </div>

      {/* <div className='flex h-[65vh] w-[24vw] border-4 rounded-[20px] mt-[20vh] ml-[3vw]'>

      </div> */}

    </div>

    
  )
}

export default Create 