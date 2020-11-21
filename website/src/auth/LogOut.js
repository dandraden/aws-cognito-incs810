/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import { Auth } from 'aws-amplify';
import DynamicImage from '../components/DynamicImage';
import { withRouter } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

import '../css/app.css';

/**
 * Sign-in Page
 */
class LogOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      email: '',
      password: '',
      code: '',
      userObject: null
    };
  }


async onSubmitVerification(e) {
    e.preventDefault();
    try {
        const data = await Auth.signOut();
        console.log('Cognito User Data:', data);
        this.props.history.replace('/');
    } catch (err) {
        alert(err.message);
        console.error('Auth.signOut(): ', err);
    }
}

  renderConfirm() {

    return (
      <div className="app">
        <header>
          <DynamicImage src="logo.png"/>
        </header>
        <section className="form-wrap">
          <form id="verifyForm" onSubmit={(e) => this.onSubmitVerification(e)}>
             <input type="submit" value="Log Out"/>
          </form>
        </section>
        <SiteFooter/>
      </div>
    );
  }

  render() {
    return this.renderConfirm();
  }
}

export default withRouter(LogOut);

