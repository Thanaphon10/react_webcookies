import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './cc.css'
import Navbar from "./components/Navbar";
import CookieConsent from './components/CookieConsent'
import Shop from "./components/Shop";
import Test from './components/test'

function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <div className="App">
      <Navbar />
      <Test/>
      <CookieConsent />
      <Shop/>
    </div>
  )
}

export default App