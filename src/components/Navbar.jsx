import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // Import the LoginModal component
import "../assets/css/Navbar.css";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap"; // Import Bootstrap components
import { useCookies } from "react-cookie";
import SetCookiesData from "./SetCookiesData";
import Switch from "react-switch";
import sut from "../assets/images/SUTFARM.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(false);
  const { t, i18n } = useTranslation(["home"]);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "theme"]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (cookies.Name) {
      setIsLoggedIn(true);
    }
    if (cookies.language) {
      //console.log(cookies.Language)
      i18n.changeLanguage(cookies.language);
    } else {
      setCookie("language", i18n.language, { path: "/" });
    }
  }, []);

  useEffect(() => {
    renderLoginButton();
    if (isLoggedIn) {
      setData(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const themeCookie = cookies.theme;
    if (themeCookie === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, [cookies.theme]);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };
  const handleLogoutClick = () => {
    removeCookie("Name", { path: "/" });
    removeCookie("Password", { path: "/" });
    setIsLoggedIn(false);
    renderLoginButton();
  };
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
    renderLoginButton();
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // Implement your filtering or searching logic here using the searchText
    // For example, you can filter a list of items based on the searchText.
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger your search logic here when Enter is pressed
      console.log('Searching for:', searchText);
      // Add your logic to perform the search based on searchText
    }
  };


  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <Button className="btn btn-dark" onClick={handleLogoutClick}>
          {t("Logout")}
        </Button>
      );
    } else {
      return (
        <Button className="btn btn-dark" onClick={handleLoginClick}>
          {t("Login")}
        </Button>
      );
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    setCookie("theme", newMode ? "dark" : "light", { path: "/" });
    document.body.classList.toggle("dark-mode", newMode);
  };

  return (
    <div className="navbar">
      <img src={sut} alt="logo"
        style={{ width: "120px", height: "50px", marginLeft: "100px" }}
      />
       <input
        type="text"
        className="search-box"
        placeholder={t("Search")}
        value={searchText}
        onChange={handleSearch}
      />
      <div className={`app ${isDarkMode ? "dark" : "light"}`} style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '0.5rem' }}>{t("Theme")}</span> {/* Adjust the margin here */}
        <Switch onChange={toggleDarkMode} checked={isDarkMode} />
        <span style={{ marginLeft: '0.5rem' }}>{cookies.theme}</span> {/* Adjust the margin here */}
      </div>

      <div>
        <Dropdown style={{ display: 'flex', alignItems: 'center' }}>
          <Dropdown.Toggle className="btn-light" id="dropdown-lang" >
            <FontAwesomeIcon icon={faGlobe} />
            <span style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>
              {i18n.language === 'th' ? t('lang_th') : t('lang_en')}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                i18n.changeLanguage('th');
                setCookie('language', 'th', { path: '/' });
              }}
              disabled={i18n.language === 'th'}
            >
              {t('lang_th')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                i18n.changeLanguage('en');
                setCookie('language', 'en', { path: '/' });
              }}
              disabled={i18n.language === 'en'}
            >
              {t('lang_en')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>{renderLoginButton()}</div>
      {isModalOpen && (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      <br />
      {data && <SetCookiesData open={isLoggedIn} />}
    </div>
  );
};

export default Navbar;
