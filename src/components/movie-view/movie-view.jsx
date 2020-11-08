import React from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { movie, user } = this.props;

    if (!movie) return null;

    // if (this.state.initialState === '') return ;

    const handleSubmit = (e) => {
      e.preventDefault();
      let checkMovieExistLS = [];
      checkMovieExistLS = JSON.parse(localStorage.getItem('favoriteMovies'));
      if (checkMovieExistLS.includes(movie.title)) {
        alert('Movie already added on favorite list');
        return;
      }

      axios
        .post(
          `https://myflix3.herokuapp.com/users/${user}/movies/${movie.title}`
        )
        .then((response) => {
          console.log(response);
          checkMovieExistLS.push(movie.title);
          localStorage.setItem(
            'favoriteMovies',
            JSON.stringify(checkMovieExistLS)
          );
          alert('Movie successfully added to favorite');
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
      <div className='movie-view'>
        <Card style={{ width: '25rem' }}>
          <Card.Img variant='top' src={movie.imagePath} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>
              <span className='label text-danger'>Description: </span>
              <span className='value'>{movie.description}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Genre: </span>
              <span className='value'>{movie.genre.name}</span>
            </Card.Text>
            <Card.Text>
              <span className='label text-danger'>Director: </span>
              <span className='value'>{movie.director.name}</span>
            </Card.Text>
            <Link to={`/`}>
              <Button variant='link'>Back</Button>
            </Link>
            <Link to={`/movies/directors/${movie.director.name}`}>
              <Button variant='link'>Director</Button>
            </Link>

            <Link to={`/movies/genre/${movie.genre.name}`}>
              <Button variant='link'>Genre</Button>
            </Link>
            <Button variant='link' onClick={(e) => handleSubmit(e)}>
              Add to favorite
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
