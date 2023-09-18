import './App.css'
import Nav from './components/Nav.jsx'
import TextArea from './components/TextArea'
import Dash from './components/Dash'
import Login from './components/Login'
import Create from './components/Create'
import React from 'react'
//for routing and linking pages together
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'



const App = () => {
  return (
    <Router>
      <div className='h-screen w-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black flex overflow-hidden'>
        <div><Nav/></div>
        <div>
          <Routes>
            <Route path="/" element={<TextArea />} />
            <Route path="/dashboard" element={<Dash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}


export default App


