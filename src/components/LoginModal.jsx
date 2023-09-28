import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

const LoginModal = ({ setIsModalOpen, handleLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation(['home']);
  const [cookies, setCookie] = useCookies(['user']);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username and password are correct
    if (!username.trim || !password.trim) {
      // Display alert for incorrect input
      alert(t('wrong'));
    } else {
      setCookie('Name', username, { path: '/' });
      setCookie('Password', password, { path: '/' });
      // Handle login success
      handleLoginSuccess();
      handleCloseModal(); // Close the modal
    }
  };

  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Title className='text-center mt-3 '>{t('Login')}</Modal.Title>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username" className='mt-3'>
            <Form.Label>{t('username')}</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('Entername')}
            />
          </Form.Group>
          <Form.Group controlId="password" className='mt-3'>
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Entepass')}
            />
          </Form.Group>
          <div className="text-center mt-4"> {/* Center the button */}
            <Button variant="primary" type="submit" className="btn btn-dark">
              {t('Login')}
            </Button>
          </div>


        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
