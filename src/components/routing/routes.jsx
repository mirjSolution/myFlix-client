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

const Routes = ({ token }) => {
  return (
    <section className='container'>
      {!token ? <Redirect to='/login' /> : <Redirect to='/' />}
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
      </Switch>
    </section>
  );
};

Routes.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Routes);
