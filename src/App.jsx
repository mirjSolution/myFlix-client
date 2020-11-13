import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainViewNavbar from './components/main-view/main-view-navbar';
import MainViewFooter from './components/main-view/main-view-footer';
import Routes from './components/routing/routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <MainViewNavbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
          <MainViewFooter />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
