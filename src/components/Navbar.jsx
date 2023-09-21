import React, { useState } from 'react';
import LoginModal from './LoginModal'; // Import the LoginModal component
import '../assets/css/Navbar.css';
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "react-bootstrap"; // Import Bootstrap components

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

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <Button variant="primary" onClick={handleLogoutClick}>
          {t('Logout')}
        </Button>
      );
    } else {
      return (
        <Button variant="primary" onClick={handleLoginClick}>
        {t('Login')}
      </Button>
      );
    }
  };

  return (
    <div className="navbar">
      <div className="logo">{t('MyWebsite')}</div>

      <ButtonGroup aria-label="Switch Lang">
        <Button className="btn-block btn-light" onClick={() => { i18n.changeLanguage('th') }}>
          {t('lang_th')}
        </Button>
        <Button className="btn-block btn-light w-50" onClick={() => { i18n.changeLanguage('en') }}>
          {t('lang_en')}
        </Button>
      </ButtonGroup>

      {renderLoginButton()}

      {isModalOpen && <LoginModal setIsModalOpen={setIsModalOpen} handleLoginSuccess={handleLoginSuccess} />}
    </div>
  );
};

export default Navbar;
