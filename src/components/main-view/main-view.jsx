import React from 'react';
import axios from 'axios';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  InputGroup,
  Container,
  Row,
  Col,
  Jumbotron,
} from 'react-bootstrap';
// import { FaSearch } from 'react-icons/fa';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import logo from '../../../public/images/logo.png';
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor
    // so React can initialize it
    super();

    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      email: null,
      birthday: null,
      register: 'register',
      profile: 'profile',
      favoriteMovies: [],
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        email: localStorage.getItem('email'),
        birthday: localStorage.getItem('birthday'),
        favoriteMovies: localStorage.getItem('favouriteMovies'),
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username,
      email: authData.user.email,
      birthday: authData.user.birthday,
      favoriteMovies: authData.user.FavouriteMovies,
    });

    localStorage.setItem(
      'favoriteMovies', authData.user.FavouriteMovies
    );

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('email', authData.user.email);
    localStorage.setItem('birthday', authData.user.birthday);
    this.getMovies(authData.token);
  }

  /* Remove token and user in local storage */
  onLoggedOut() {
    localStorage.clear();
    this.setState({
      user: null,
    });
  }

  /* Register new user*/
  onRegister(register) {
    this.setState({ register: register });
  }

  // Profile update
  onProfile(profile) {
    this.setState({
      profile: profile,
    });
    this.componentDidMount();
  }

  // onUnregister
  onUnregister(user) {
    this.setState({
      user: user,
    });
  }

  /* When back button click selectedMovie will set on it's initial state*/
  setInititalState() {
    this.setState({
      selectedMovie: null,
    });
  }

  // Get movies in saved in heroku
  getMovies(token) {
    axios
      .get('https://telugumovies99.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This overrides the render() method of the superclass
  // No need to call super() though, as it does nothing by default
  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, register, user, profile } = this.state;

    // Before the movies have been loaded
    if (!register)
      return (
        <RegistrationView
          onRegister={(register) => this.onRegister(register)}
          onLoggedIn={(user) => {
            this.onLoggedIn(user)
          }}
        />
      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(register) => this.onRegister(register)}
        />
      );

    // Before the movies have been loaded
    if (!profile)
      return (
        <ProfileView
          user={this.state.user}
          email={this.state.email}
          birthday={this.state.birthday}
          onProfile={(profile) => this.onProfile(profile)}
          onUnregister={(user) => this.onUnregister(user)}
        />
      );

    // Before the movies have been loaded
    if (!movies) return <div className='main-view' />;

    return (
      <Router>
        <div className='main-view'>
          <header>
            <Navbar
              collapseOnSelect
              expand='lg'
              bg='dark'
              variant='dark'
              fixed='top'
            >
              <Navbar.Brand>
                <Link to='/'>
                  <img
                    src={logo}
                    className='d-inline-block align-top'
                    alt='React Bootstrap logo'
                    height="50"
                  />
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav.Link onClick={() => this.onProfile('')}>
                    PROFILE
                  </Nav.Link>
                  <Nav.Link onClick={() => this.onLoggedOut()}>LOGOUT</Nav.Link>
                </Nav>
                {/* <Form inline>
                  <InputGroup>
                    <FormControl
                      placeholder='Enter keyword here'
                      aria-label='Enter keyword here'
                      aria-describedby='basic-addon2'
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id='basic-addon2'>
                        <FaSearch />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
               </Form>*/}
              </Navbar.Collapse>
            </Navbar>
          </header>
          <div className='user-profile'></div>
          <div className='main-body text-center'>
            <Container>
              <Row>
                <Route
                  exact
                  path='/'
                  render={() =>
                    movies.map((m) => (
                      <Col xs={12} md={3} key={m._id} className='p-2'>
                        <MovieCard key={m._id} movie={m} />
                      </Col>
                    ))
                  }
                />
              </Row>
            </Container>
            <Route
              path='/movies/:movieId'
              render={({ match }) => (
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path='/movies/genre/:genre'
              render={({ match }) => (
                <GenreView
                  movie={movies.find(
                    (m) => m.genre.name === match.params.genre
                  )}
                />
              )}
            />

            <Container>
              <Row>
                <Route
                  exact
                  path='/movies/genre/:genre'
                  render={({ match }) =>
                    movies
                      .filter((m) => m.genre.name.includes(match.params.genre))
                      .map((m) => (
                        <Col xs={12} md={3} key={m._id} className='p-2'>
                          <MovieCard key={m._id} movie={m} />
                        </Col>
                      ))
                  }
                />
              </Row>
            </Container>

            <Route
              exact
              path='/movies/directors/:name'
              render={({ match }) => (
                <DirectorView
                  movie={movies.find(
                    (m) => m.Director.name === match.params.name
                  )}
                />
              )}
            />

            <Container>
              <Row>
                <Route
                  exact
                  path='/movies/directors/:name'
                  render={({ match }) =>
                    movies
                      .filter((m) =>
                        m.Director.name.includes(match.params.name)
                      )
                      .map((m) => (
                        <Col
                          xs={12}
                          md={{ span: 3 }}
                          key={m._id}
                          className='p-2'
                        >
                          <MovieCard key={m._id} movie={m} />
                        </Col>
                      ))
                  }
                />
              </Row>
            </Container>
          </div>

          <Jumbotron className=' text-center'>
            <h1>MyFlix Movie</h1>
            <p>Collection of all time favorite movies.</p>
          </Jumbotron>
          <footer className='fixed-bottom bg-dark text-white text-center'>
            <p>Coyright &#169; 2020 myFlix. All rights reserved</p>
          </footer>
        </div>
      </Router>
    );
  }
}
