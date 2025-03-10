import { useState } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/reuse/auth/login'
import Register from './Components/reuse/auth/register'
import AuthLayout from './Components/reuse/auth/authContainer'
import Home from './Home'

function App() {

  return (
    <>
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/app/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

