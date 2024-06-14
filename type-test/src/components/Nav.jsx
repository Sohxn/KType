import React from 'react'
import '../App.css'
import cbp from '../assets/icons/pfp.jpg'
import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import { signOut} from 'firebase/auth'
import {auth} from './firebase-config'


const Nav = () => {

  const [sbopen, setsbopen] = useState(false)
  const {user} = useAuth()
  //user state var can be used to access the logged in users attributes 
  const navigate = useNavigate();

  //for the title 
  const [name, setName] = useState('')
  //for fetching
  const usermail = user? user.email : ''

  //fetching username
  // const fetchname = (usr) => {
  //   axios.get(`http://127.0.0.1:8080/api/name/${usr}`)
  //     .then((response) => {
  //       setName(response.data['username'])
  //     })
  //     .catch((error) => {
  //       console.error("ERROR",error);
  //     });
  // };

  const handleLogout = async () => {
    await signOut(auth); // Sign out the user
    navigate('/login'); // Redirect to login page
    setsbopen(!sbopen);
  };

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
    }

  document.addEventListener('keydown' , HandleKeyDown)


  return () => {
    document.removeEventListener('keydown' , HandleKeyDown)
    }
  },
  [sbopen, sbtoggle, usermail])

//   useEffect(() =>{
//     if(user){
//       fetchname(usermail)
//     }
//   },
//  [usermail])
  
  
  return (
    <div  className='fixed flex h-[12vh] w-screen justify-center'>
        <div className='mt-6 rounded-lg w-[90vw] flex mr-auto ml-10'>
          <h className='flex font-roboto text-[3.5vh] text-white hover:cursor-pointer'>TypeRabbit.</h>
        </div>

        <div id='buttontoopensidebar' className='text-white font-roboto fixed flex cursor-pointer right-10 top-10'>
          {sbopen ? (
           <></>
          ) : (
            <>  
            <button className="rounded-full h-12 w-12 border-4 border-blue-300 ease-in-out duration-500">
              {user ? <img src={cbp} className='rounded-full' onClick={sbtoggle}/>
              :
              <img src={cbp} className='rounded-full' onClick={sbtoggle}/>
              }
            </button>
            </>
            )}
          {/*sidebar*/} 
          <div className={`top-0 right-0 lg:w-[20vw] md:w-screen sm:w-screen bg-gray-900 p-10 pl-20 text-white fixed h-full z-40 rounded-2xl ease-in-out duration-500 ${
                sbopen ? "translate-x-0" : "translate-x-full"
          }`}>
          {/*parent div of sidebar elements*/}
          <div className='font-roboto'>
              {user ? <div className='text-2xl mb-[5vh] text-center'><span>LVL 0</span></div>
              :
              <div className='text-4xl mb-[5vh] text-center'><span>Guest</span></div>
              }

              <ul className='mb-[75vh]'>
                <li className='flex justify-center'>
                  <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/dashboard"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 border-white text-center mb-[3vh]'>DASH</div></Link></button>
                </li>
                {user ?
                  <li className='flex justify-center'>
                  <button onClick={handleLogout} className='min-w-[10vw]'><div className='hover:bg-red hover:text-white ease-in-out duration-500 border-2 rounded-2xl p-4 text-center border-white mb-[3vh]'>LOGOUT</div></button>
                  </li>
                  :
                  <li className='flex justify-center'>
                  <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/login"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 text-center border-white mb-[3vh]'>LOGIN / SIGNUP</div></Link></button>
                  </li>
                }
                <li className='flex justify-center'>
                <button onClick={sbtoggle} className='min-w-[10vw]'><Link to="/"><div className='hover:bg-white hover:text-black ease-in-out duration-500 border-2 rounded-2xl p-4 text-center border-white mb-[3vh]'>TYPE</div></Link></button>
                </li>
                
              </ul>
              
          </div>
          </div>
        </div>
       
    </div>
  )
}

export default Nav
