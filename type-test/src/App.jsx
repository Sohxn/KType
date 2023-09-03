import './App.css'
import Nav from './components/Nav.jsx'
import TextArea from './components/TextArea'
import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios';


const App = () => {

  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black flex '>
      <div><Nav/></div>
      <div><TextArea/></div>
    </div>
  )
}


export default App
