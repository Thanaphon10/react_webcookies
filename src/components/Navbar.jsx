import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal"; // Import the LoginModal component
import "../assets/css/Navbar.css";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "react-bootstrap"; // Import Bootstrap components
import { useCookies } from "react-cookie";
import SetCookiesData from "./SetCookiesData";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(false);
  const { t, i18n } = useTranslation(["home"]);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    if(cookies.Name){
      setIsLoggedIn(true)
    }
    if(cookies.language){
      //console.log(cookies.Language)
      i18n.changeLanguage(cookies.language);
    }else{
      setCookie("language",i18n.language,{path: "/"})
    }
  }, []);

  useEffect(() => {
    renderLoginButton();
    if(isLoggedIn){
    setData(true);}
  }, [isLoggedIn]);


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
  console.log(cookies.Name);

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

  return (
    <div className="navbar">
      <div className="logo">{t("MyWebsite")}</div>

      <ButtonGroup aria-label="Switch Lang">
        <Button
          className="btn-block btn-light"
          onClick={() => {
            i18n.changeLanguage("th");
            setCookie("language",i18n.language, { path: '/' })
          }}
        >
          {t("lang_th")}
        </Button>
        <Button
          className="btn-block btn-light w-50"
          onClick={() => {
            i18n.changeLanguage("en");
            setCookie("language",i18n.language, { path: '/' })
          }}
        >
          {t("lang_en")}
        </Button>
      </ButtonGroup>

      {renderLoginButton()}

      {isModalOpen && (
        <LoginModal
          setIsModalOpen={setIsModalOpen}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      {data &&
      <SetCookiesData open ={isLoggedIn}/>
      }
    </div>
  );
};

export default Navbar;
