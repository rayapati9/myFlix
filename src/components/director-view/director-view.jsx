import React from 'react';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <div className='director-description p-2'>
        <p>Director Description</p>
        <p className='text-danger'>Name: {movie.Director.name}</p>
        <p>Age: {movie.Director.age}</p>
      </div>
    );
  }
}