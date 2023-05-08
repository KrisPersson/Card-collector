import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import './App.css'
import { ChecklistView } from "./views/ChecklistView"
import { verifyToken } from './api'

import Header from "./components/Header"
const tokenInLS = localStorage.getItem('userToken')
const tokenVerified = await verifyToken(tokenInLS)


function App() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('userToken') || !tokenVerified) {
      navigate('/login-signup')
    } 
  }, [navigate])

  
  


  return (
    <>
    <Header username={ localStorage.getItem('username') } />
    
    <main>
      <Outlet />

    </main>
    </>
  )
}

export default App
