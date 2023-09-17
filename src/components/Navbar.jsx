import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Import the LoginModal component
import '../style/Navbar.css';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="navbar">
      <div className="logo">My Website</div>
      {/* <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav> */}
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>
      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Navbar;