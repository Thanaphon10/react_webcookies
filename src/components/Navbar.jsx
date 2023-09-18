import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Import the LoginModal component
import '../style/Navbar.css';
import { useTranslation } from "react-i18next";
import { ButtonGroup, Button } from "react-bootstrap";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, i18n } = useTranslation(["home"]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };
  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  return (
    <div className="navbar">
      <div className="logo">{t('MyWebsite')}</div>
      {/* <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav> */}
      <ButtonGroup aria-label="Switch Lang">
        <Button className='btn-lang' onClick={() => {
          i18n.changeLanguage('th')
        }}>
          {t('lang_th')}
        </Button>
        <Button className='btn-lang' onClick={() => {
          i18n.changeLanguage('en')
        }}>
           {t('lang_en')}
        </Button>
      </ButtonGroup>

      {isLoggedIn ? (
        <Button
          type="button"
          className="btn btn-light "
          onClick={handleLogoutClick}
        >
        {t('Logout')}  
        </Button>
      ) : (
        <Button
          type="button"
          className="btn btn-light "
          onClick={handleLoginClick}
        >
          {t('Login')}
        </Button>
      )}

      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} handleLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Navbar;