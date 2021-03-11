import React from 'react';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='genre-description p-2'>
        <p>Genre Description</p>
        <p className='text-danger'>{movie.genre.name}</p>
        <p>{movie.genre.Description}</p>
      </div>
    );
  }
}