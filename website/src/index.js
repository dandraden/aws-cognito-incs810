/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Home, Profile } from './pages';
import { SignIn, SignUp, LogOut } from './auth';
import 'normalize.css';
import Amplify from 'aws-amplify';
import awsConfig from './amplify-config';

Amplify.configure(awsConfig);

const isAuthenticated = () => Amplify.Auth.user !== null;
window.$token = 'aa' //global variable

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/signin' />
  )} />
)

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={SignUp} />
	        <Route path="/signin" component={SignIn} />
          <Route path="/logout" component={LogOut} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
