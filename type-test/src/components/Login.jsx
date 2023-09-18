import React from 'react'
import '../app.css'
import pattern from '../assets/vectors/backdrop_vector.svg'
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex bg-black h-screen w-screen justify-center'>
      <div className='h-[65vh] bg-cover w-[24vw] border-4 rounded-[20px] mt-[20vh] justify-center grid grid-rows-2 outline-3' style={{ backgroundImage: `url(${pattern})` }}>
        <div id='logintitle' className='flex h-[6vh] w-[10vw] bg-white row rounded-[7px] font-roboto text-2xl text-center justify-center mt-[5vh] m-auto'>
          <h className='self-center'>Login.</h>
        </div>
 
        <div id="inputarea" className='rounded-xl h-[30vh] w-fit mb-auto mt-[-10vh] grid gap-4'>
           <input placeholder="Email / Username" id="email" type="text" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <input placeholder="Password" id="password" type="text" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <button className='font-roboto text-white mt-[5vh]'>Forgot password</button>
           <Link to='/create' className='flex font-roboto justify-center text-gray-200 mt-[-2vh]'>Create account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login