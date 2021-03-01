import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <div className='movie-view'>
        <Card>
          <Card.Img className='movie-poster' variant="top" src={movie.imagePath} />
          <Card.Title className='label-title'>{movie.title}</Card.Title>
          <Card.Body>
            <Card.Text className='label-body'>{movie.Description}</Card.Text>
            <Card.Text className='label-body'>Director: {movie.Director.name}</Card.Text>
            <Card.Text className='label-body'>Genre: {movie.genre.name}</Card.Text>
          </Card.Body>
          <Button className='return-button' variant='dark' onClick={() => onClick(movie)}>Return to Movie List</Button>
        </Card>
      </div>
    );
  }
}

MovieView.propTypes = {
  // shape({...}) means it expects an object
  movie: PropTypes.shape({
    // movie prop may contain Title, and IF it does, it must be a string
    title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired
    }),
  }).isRequired,
  // props object must contain onClick and it MUST be a function
  onClick: PropTypes.func.isRequired
};