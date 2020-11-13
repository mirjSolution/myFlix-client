import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/movies/:title' component={MovieView} />
        <Route exact path='/movies/genre/:genreName' component={GenreView} />
        <Route
          exact
          path='/movies/director/:directorName'
          component={DirectorView}
        />
      </Switch>
    </section>
  );
};

export default Routes;
