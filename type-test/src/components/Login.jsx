import React from 'react'
import '../app.css'
import pattern from '../assets/vectors/backdrop_vector.svg'

const Login = () => {
  return (
    <div className='flex bg-black h-screen w-screen justify-center'>
      <div className='flex  h-[65vh] bg-cover w-[24vw] border-4 rounded-[20px] mt-[20vh] justify-center grid grid-rows-2' style={{ backgroundImage: `url(${pattern})` }}>
        <div id='logintitle' className='flex h-[6vh] w-[10vw] bg-white row rounded-[7px] font-roboto text-2xl text-center justify-center mt-[5vh]'>
          <h className='self-center'>Login.</h>
        </div>
      </div>
    </div>
  )
}

export default Login