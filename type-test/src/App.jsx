import './App.css'
import Nav from './components/Nav.jsx'
import TextArea from './components/TextArea'
import Dash from './components/Dash'
import Login from './components/Login'
import Create from './components/Create'
import TypeJet from './components/TypeJet'
import React from 'react'
//for routing and linking pages together
// import {BrowserRouter as Router } from 'react-router-dom'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { AuthProvider, ProtectedRoute } from './components/auth/AuthContext.jsx'


//main web app screen all themes apply here and only here
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className='h-screen w-screen bg-[#111827] flex overflow-hidden'>
          <div><Nav/></div>
          <div>
            <Routes>
              <Route path="/" element={<TextArea />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dash /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<Create />} />
              <Route path="/jet" element={<TypeJet/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}


export default App


