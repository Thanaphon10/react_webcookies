import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // Import the LoginModal component
import "../assets/css/Navbar.css";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "react-bootstrap"; // Import Bootstrap components
import { useCookies } from "react-cookie";
import SetCookiesData from "./SetCookiesData";
import Switch from "react-switch";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(false);
  const { t, i18n } = useTranslation(["home"]);
  const [cookies, setCookie, removeCookie] = useCookies(["user", "theme"]);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <Button variant="primary" onClick={handleLogoutClick}>
          {t("Logout")}
        </Button>
      );
    } else {
      return (
        <Button variant="primary" onClick={handleLoginClick}>
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
      <div className="h3">{t("MyWebsite")}</div>

      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
        <main>
          <label>
            {t("Theme")}
            <Switch onChange={toggleDarkMode} checked={isDarkMode} />
            <p>{cookies.theme}</p>
          </label>
        </main>
      </div>
      <div>
        <ButtonGroup aria-label="Switch Lang">
          <Button
            className="btn-block btn-light"
            onClick={() => {
              i18n.changeLanguage("th");
              setCookie("language", i18n.language, { path: "/" });
            }}
            disabled={i18n.language === "th"}
          >
            {t("lang_th")}
          </Button>
          <Button
            className="btn-block btn-light"
            onClick={() => {
              i18n.changeLanguage("en");
              setCookie("language", i18n.language, { path: "/" });
            }}
            disabled={i18n.language === "en"}
          >
            {t("lang_en")}
          </Button>
        </ButtonGroup>
      </div>
      <div>{renderLoginButton()}</div>
      {isModalOpen && (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      <br/>
      {data && <SetCookiesData open={isLoggedIn} />}
    </div>
  );
};

export default Navbar;
