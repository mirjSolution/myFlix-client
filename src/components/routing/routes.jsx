import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import MovieList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import LoginView from '../login-view/login-view';
import NotFound from '../not-found-view/not-found-view';

const Routes = ({ isAuthenticated }) => {
  return (
    <section className='container'>
      {!isAuthenticated ? <Redirect to='/login' /> : ''}
      <Switch>
        <Route exact path='/' component={MovieList} />
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/movies/:title' component={MovieView} />
        <Route exact path='/movies/genre/:genreName' component={GenreView} />
        <Route
          exact
          path='/movies/director/:directorName'
          component={DirectorView}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);
