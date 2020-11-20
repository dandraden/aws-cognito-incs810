/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import { Auth } from 'aws-amplify';
import DynamicImage from '../components/DynamicImage';
import { withRouter } from 'react-router-dom';
import SiteFooterLogOut from '../components/SiteFooterLogout';

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
        <SiteFooterLogOut/>
      </div>
    );
  }

  render() {
    return this.renderConfirm();
  }
}

export default withRouter(LogOut);

