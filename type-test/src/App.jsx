import './App.css'
import Nav from './components/Nav.jsx'
import TextArea from './components/TextArea'
import Dash from './components/Dash'
import Login from './components/Login'
import Create from './components/Create'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
//for routing and linking pages together
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


//main web app screen all themes apply here and only here
const App = () => {
  return (
    //install kar laude
    <CSSTransition in={true} timeout={400} classNames="fade">
      <Router>
        <div className='h-screen w-screen bg-[#111827] flex overflow-hidden'>
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
    </CSSTransition>
  )
}


export default App


