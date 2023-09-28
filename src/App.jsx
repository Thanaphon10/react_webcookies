import { Route, Routes } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './cc.css'
import Navbar from "./components/Navbar";
import CookieConsent from './components/CookieConsent'
import Shop from "./components/Shop";
import Rectangle40111 from "./assets/images/Rectangle40111.png"
import bg from "./assets/images/bg.png"
import Footer from "./components/Footer"
function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState('');
  
  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };
  return (

    <div className="App">
      <img src={Rectangle40111} alt="Rectangle40111"
        style={{ width: "100%"}}
      />
      <Navbar />
      <img src={bg} alt="logo"
        style={{ width: "100%", height: "60%" }}
      />
      <CookieConsent />
      <Shop />
      <Footer/>
      <img src={Rectangle40111} alt="Rectangle40111"
        style={{ width: "100%"}}
      />
    </div>
  )
}

export default App