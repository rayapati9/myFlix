import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();

    axios
      .post('https://telugumovies99.herokuapp.com/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(() => {
        console.log('Invalid Credential');
        formValidation('Invalid Credential');
      });
  };

  const formValidation = (serverError) => {
    const usernameErr = {};
    const passwordErr = {};
    let isValid = true;

    if (serverError === 'Invalid Credential') {
      usernameErr.invalidCredential = 'Invalid Credential';
      passwordErr.invalidCredential = 'Invalid Credential';
      isValid = false;
    }

    if (username.trim().length < 5) {
      usernameErr.userNameShort = 'Username is too short';
      isValid = false;
    }

    if (username.trim().length > 10) {
      usernameErr.userNameLong = 'Username is too long';
      isValid = false;
    }

    if (username.trim().length === 0) {
      usernameErr.userNameRequired = 'Username is required';
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordErr.passwordShort = 'Password is too short';
      isValid = false;
    }

    if (password.trim().length > 10) {
      passwordErr.passwordLong = 'Password is too long';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordRequired = 'Password is required';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(null);
  };

  return (
    <React.Fragment>
      <Form className='form-login'>
        <h1 className='text-danger text-center mt-5'>Welcome to myFlix!</h1>
        <p className='mb-5'>Please login to continue.</p>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
            required
          />
          {Object.keys(usernameErr).map((key) => {
            return <div style={{ color: 'red' }}>{usernameErr[key]}</div>;
          })}
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter Password'
          />
          {Object.keys(passwordErr).map((key) => {
            return <div style={{ color: 'red' }}>{passwordErr[key]}</div>;
          })}
        </Form.Group>
        <p>
          Dont have an account?
          <Button onClick={handleRegister} variant='link'>
            Register
          </Button>
        </p>
        <Button onClick={handleSubmit} variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}
