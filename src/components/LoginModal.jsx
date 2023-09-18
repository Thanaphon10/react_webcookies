import React, { useState } from 'react';
import '../style/LoginModal.css';
import { Button } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const LoginModal = ({ setIsModalOpen , handleLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { t, i18n } = useTranslation(["home"]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if username and password are correct
        if (username !== 'abc' || password !== '123') {
            // Display alertDialog for incorrect input
            alert(t('wrong'));
            return;  // Prevent further execution
        } else {
            handleLoginSuccess();
        }

        // Handle login logic for correct input
        // ...
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                    &times;
                </span>
                <h2>{t('Login')}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">{t('username')} : </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{t('password')} : </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="btn btn-blue w-50"
                    >
                        {t('Submit')}

                    </Button>

                </form>
            </div>
        </div>
    );
};

export default LoginModal;
