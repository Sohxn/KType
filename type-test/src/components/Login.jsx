import React from 'react'
import '../app.css'
import pattern from '../assets/vectors/backdrop_vector.svg'
import {Link} from 'react-router-dom'
import google from '../assets/icons/google.png'
import {useState} from 'react'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth'
import { useAuth } from '../contexts/authContext'

const Login = () => {
  //@vineet this is to set up Google authentication
  const { userLoggedIn } = useAuth()
  const [GAuth, toggle_GAuth] = useState(0)

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn) {
        setIsSigningIn(true)
        await doSignInWithEmailAndPassword(email, password)
        // doSendEmailVerification()
     }
  }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }


  return (
    <div className='flex bg-black h-screen w-screen justify-center'>
      <div className='h-[65vh] bg-cover w-[24vw] border-4 rounded-[20px] mt-[20vh] justify-center grid grid-rows-2 outline-3' style={{ backgroundImage: `url(${pattern})` }}>
        <div id='logintitle' className='flex h-[6vh] w-[10vw] bg-white row rounded-[7px] font-roboto text-2xl text-center justify-center mt-[5vh] m-auto'>
          <h className='self-center'>Login.</h>
        </div>
 
        <div id="inputarea" className='rounded-xl h-[30vh] w-fit mb-auto mt-[-10vh] grid gap-4 justify-center'>
           <input placeholder="Email / Username" id="email" type="text" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <input placeholder="Password" id="password" type="password" className='flex text-white bg-transparent border-2 h-[50px] rounded-[10px] w-[15vw] border-white self-center focus:border-white'/>
           <button className='flex text-white text-center justify-center items-center font-roboto bg-transparent border-2 h-[50px] rounded-[10px] w-[15wv] border-white self-center focus:border-white'>Continue with<img src={google} className='w-[40px] h-[40px] ml-[10px]'/></button>
           
           <button className='font-roboto mt-[2vh]'><h className='text-black bg-white p-2 rounded-[10px]'>LOGIN</h></button>
           <button className='font-roboto text-white mt-[2vh]'>Forgot password</button>
           <Link to='/create' className='flex font-roboto justify-center text-white'>Create account</Link>
        </div>
      </div>
    </div>
  )
}

export default Login