import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const LoginModal = ({ setIsModalOpen, handleLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation(['home']);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if username and password are correct
    if (username !== 'abc' || password !== '123') {
      // Display alert for incorrect input
      alert(t('wrong'));
    } else {
      // Handle login success
      handleLoginSuccess();
      handleCloseModal(); // Close the modal
    }
  };

  return (
    <Modal show={true} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Login')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>{t('username')}</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('Entername')}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Entepass')}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {t('Submit')}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
