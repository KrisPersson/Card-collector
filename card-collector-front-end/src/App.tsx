import { useState } from 'react'

import './App.css'
import { ChecklistView } from "./views/ChecklistView"
import LoginSignupView from "./views/LoginSignupView"



function App() {

  const 

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function setLoggedIn() {

    setIsLoggedIn(true)
  }

  return (
    isLoggedIn ? 
    <ChecklistView /> :
    <LoginSignupView />
  )
}

export default App
