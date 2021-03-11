import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world
    // which, in this case, is `MainView`, as `MainView` is what’s
    // connected to your database via the movies endpoint of your API
    const { movie } = this.props;

    return (
      <div className='movie-cards'>
        <Link to={`/movies/${movie._id}`}>
          <Card border='danger' style={{ width: '200', height: 'auto' }}>
            <Card.Header>{movie.title}</Card.Header>
            <img
              className='movie-poster'
              src={movie.imagePath}
              alt='movie poster'
            />
          </Card>
        </Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

