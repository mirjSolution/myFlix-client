import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import MovieList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import RegistrationView from '../registration-view/registratrion-view';
import PrivateRoute from '../routing/privateroute';

const Routes = ({ auth }) => {
  return (
    <section className='container'>
      {!auth ? <Redirect to='/login' /> : <Redirect to='/' />}
      <Switch>
        <Route exact path='/login' component={LoginView} />
        <PrivateRoute exact path='/' component={MovieList} />
        <PrivateRoute exact path='/register' component={RegistrationView} />
        <PrivateRoute exact path='/profile' component={ProfileView} />
        <PrivateRoute exact path='/movies/:title' component={MovieView} />
        <PrivateRoute
          exact
          path='/movies/genre/:genreName'
          component={GenreView}
        />
        <PrivateRoute
          exact
          path='/movies/director/:directorName'
          component={DirectorView}
        />
      </Switch>
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
