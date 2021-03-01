import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

import { Form, Button } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send a request to server for authentication, then calls props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <React.Fragment>
      <Form className='login'>
        <h1 className='header'>Login Here:</h1>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Your Username goes here!'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Your password goes here!'
          />
        </Form.Group>
        <Button onClick={handleSubmit} variant='dark' type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pasword: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};