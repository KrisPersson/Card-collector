import { useState } from 'react'

import './App.css'
import { ChecklistView } from "./views/ChecklistView"
import LoginSignupView from "./views/LoginSignupView"



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    isLoggedIn ? 
    <ChecklistView /> :
    <LoginSignupView />
  )
}

export default App
