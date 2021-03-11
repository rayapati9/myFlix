import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, InputGroup, FormControl, Card } from 'react-bootstrap';

import './profile-view.scss';
import axios from 'axios';

export function ProfileView(props) {
  let favoriteMovies = [];
  favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
  const [user, setUsername] = useState(props.user);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState(props.birthday);
  const [favoriteMoviesUpdate, setFavoriteMoviesUpdate] = useState(
    favoriteMovies
  );

  const [usernameErr, setUsernameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});

  let convertDate = new Date(birthday).toISOString().slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthday === '') {
      formValidation();
      return;
    }
    axios
      .put(`https://telugumovies99.herokuapp.com/users/${props.user}`, {
        username: user,
        password: password,
        email: email,
        birthday: birthday,
      })
      .then(() => {
        localStorage.removeItem('user', 'email', 'birthday');
        localStorage.setItem('user', user);
        localStorage.setItem('email', email);
        localStorage.setItem('birthday', birthday);
        props.onProfile('profile');
      })
      .catch(() => {
        console.log('Error updating user');
        formValidation();
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.onProfile('profile');
  };

  const handleUnregister = (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to unregister?')) {
      axios
        .delete(`https://telugumovies99.herokuapp.com/users/${props.user}`)
        .then(() => {
          localStorage.clear();
          props.onUnregister(null);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleRemoveMovie = (movie) => {
    let updateMovieList = [];
    updateMovieList = JSON.parse(localStorage.getItem('favoriteMovies'));
    if (confirm(`Are you sure you want to remove this ${movie}?`)) {
      axios
        .delete(
          `https://telugumovies99.herokuapp.com/users/${props.user}/movies/${movie._id}`
        )
        .then(() => {
          updateMovieList.pop(movie);
          localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(updateMovieList)
          );
          setFavoriteMoviesUpdate(updateMovieList);
        })
        .catch((e) => {
          console.log(e);
        });
    }
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

    if (birthday === null) {
      birthdayErr.selectDate = 'Please select date';
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      confirmPasswordErr.confirmNotMatch = 'Password does not match';
      passwordErr.passwordNotMatch = 'Password does not match';
      isValid = false;
    }

    if (user.trim().length < 5) {
      usernameErr.userNameShort = 'Username is too short';
      isValid = false;
    }

    if (user.trim().length > 10) {
      usernameErr.userNameLong = 'Username is too long';
      isValid = false;
    }

    if (user.trim().length === 0) {
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
      <h1 className='text-danger text-center mt-5'>Welcome to your Profile!</h1>
      <p className='mb-3 text-center'>
        You can Update, Unregister and Remove your favorite movies from here
      </p>
      <div className='profile-view'>
        <div className='favorite-movies text-center'>
          <Card>
            Favorite Movies
            {favoriteMoviesUpdate.map((movie) => {
            return (
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder={movie}
                  aria-label='Favorite Movies'
                  aria-describedby='basic-addon2'
                  disabled
                />
                <InputGroup.Append>
                  <Button
                    onClick={() => handleRemoveMovie(movie)}
                    variant='danger'
                  >
                    Delete
                    </Button>
                </InputGroup.Append>
              </InputGroup>
            );
          })}
          </Card>
        </div>
        <div className='form-register'>
          <Card>
            <Form>
              <Form.Group controlId='formBasicText'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  value={user}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={props.user}
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
                  placeholder={props.email}
                />
                {Object.keys(emailErr).map((key) => {
                  return <div style={{ color: 'red' }}>{emailErr[key]}</div>;
                })}
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Change Password</Form.Label>
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
                    <div style={{ color: 'red' }}>
                      {confirmPasswordErr[key]}
                    </div>
                  );
                })}
              </Form.Group>
              <Form.Group controlId='formBasicBirthday'>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type='date'
                  value={convertDate}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                {Object.keys(birthdayErr).map((key) => {
                  return <div style={{ color: 'red' }}>{birthdayErr[key]}</div>;
                })}
              </Form.Group>
              <Button
                className='mr-2'
                onClick={handleSubmit}
                variant='success'
                type='submit'
              >
                Update
              </Button>
              <Button
                onClick={handleUnregister}
                variant='danger'
                type='submit'
                className='mr-2'
              >
                Unregister
              </Button>
              <Button onClick={handleCancel} variant='primary' type='submit'>
                Cancel
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string,
  onProfile: PropTypes.func.isRequired,
  onUnregister: PropTypes.func.isRequired,
};
