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

const Routes = ({ auth }) => {
  console.log(auth);
  return (
    <section className='container'>
      {!auth ? <Redirect to='/login' /> : <Redirect to='/' />}
      <Switch>
        <Route exact path='/login' component={LoginView} />
        <Route exact path='/' component={MovieList} />
        <Route exact path='/register' component={RegistrationView} />
        <Route exact path='/profile' component={ProfileView} />
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

const mapStateToProps = (state) => ({
  auth: state.auth.userInfo,
});

export default connect(mapStateToProps)(Routes);
