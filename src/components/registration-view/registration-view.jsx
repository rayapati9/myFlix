import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthday === '') {
      formValidation();
      return;
    }
    axios
      .post('https://telugumovies99.herokuapp.com/users', {
        username,
        password,
        email,
        birthday,
      })
      .then(() => {
        props.onRegister('register');
      })
      .catch((e) => {
        console.log('error registering the user');
        formValidation();
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister('register');
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const confirmPasswordErr = {};
    const emailErr = {};
    const birthdayErr = {};
    const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let checkEmail = emailReg.test(email);
    let isValid = true;

    if (birthday === '') {
      birthdayErr.selectDate = 'Please select date';
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      confirmPasswordErr.confirmNotMatch = 'Password does not match';
      passwordErr.passwordNotMatch = 'Password does not match';
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

    if (password.trim().length > 50) {
      passwordErr.passwordLong = 'Password is too long';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordRequired = 'Password is required';
      isValid = false;
    }

    if (confirmPassword.trim().length < 5) {
      confirmPasswordErr.confirmPasswordShort = 'Password is too short';
      isValid = false;
    }

    if (confirmPassword.trim().length > 50) {
      confirmPasswordErr.confirmPasswordLong = 'Password is too long';
      isValid = false;
    }

    if (confirmPassword.trim().length === 0) {
      confirmPasswordErr.confirmPasswordRequired = 'Password is required';
      isValid = false;
    }

    if (!checkEmail) {
      emailErr.emailInvalid = 'Invalid Email';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setBirthdayErr(birthdayErr);
    setPasswordErr(passwordErr);
    setConfirmPasswordErr(confirmPasswordErr);
    setEmailErr(emailErr);
    return isValid;
  };

  return (
    <React.Fragment>
      <Form className='form-register'>
        <h1 className='text-danger text-center mt-5'>Welcome to myFlix!</h1>
        <p className='mb-5'>Please register to continue.</p>
        <Form.Group controlId='formBasicText'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter Username'
          />
          {Object.keys(usernameErr).map((key) => {
            return <div style={{ color: 'red' }}>{usernameErr[key]}</div>;
          })}
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
          />
          {Object.keys(emailErr).map((key) => {
            return <div style={{ color: 'red' }}>{emailErr[key]}</div>;
          })}
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
          />
          {Object.keys(passwordErr).map((key) => {
            return <div style={{ color: 'red' }}>{passwordErr[key]}</div>;
          })}
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Enter Confirm Password'
          />
          {Object.keys(confirmPasswordErr).map((key) => {
            return (
              <div style={{ color: 'red' }}>{confirmPasswordErr[key]}</div>
            );
          })}
        </Form.Group>
        <Form.Group controlId='formBasicBirthday'>
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type='date'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder='Enter Birthday'
          />
          {Object.keys(birthdayErr).map((key) => {
            return <div style={{ color: 'red' }}>{birthdayErr[key]}</div>;
          })}
        </Form.Group>
        <div className='action-button'>
          <Button
            className='mr-2'
            onClick={handleSubmit}
            variant='primary'
            type='submit'
          >
            Submit
          </Button>

          <Button onClick={handleCancel} variant='danger' type='submit'>
            Cancel
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
  }),
  onRegister: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
