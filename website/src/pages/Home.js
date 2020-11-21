/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import { Link } from 'react-router-dom';
import DynamicImage from '../components/DynamicImage';
import SiteFooter from '../components/SiteFooter';

import '../css/main.css';

const AboutSection = () => (
  <section className="home-about">
    <div className="row column large-9 xlarge-6 xxlarge-4">
      <h2 className="section-title">Information</h2>
      <p className="content">
        This demo application was developed by students of the INCS-810 FAVA1 2020 class to demostrate the secure serverless MFA authentication process provided by AWS Cognito.
      </p>
    </div>
    <div className="row medium-up-2 large-up-3">
      <div className="column">
        <div className="home-about-block">
          <Link className="title icon-download" to="/register"></Link>
          <h3 className="section-title">Register</h3>
          <p className="content">Join our platform! Provide your identification to get your access code.</p>
        </div>
      </div>
      <div className="column">
        <div className="home-about-block">
          <Link className="title icon-success" to="/signin"></Link>
          <h3 className="section-title">Sing In</h3>
          <p className="content">Login using your access code.</p>
        </div>
      </div>
      <div className="column">
        <div className="home-about-block">
          <Link className="title icon-price" to="/profile"></Link>
          <h3 className="section-title">Profile</h3>
          <p className="content">Manage your user profile and update your personal picture.</p>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="page-home">
      <div className="page-unicorns2">
        <header className="site-header2">
          <DynamicImage src="logo.png"/>
        </header>
      </div>
      <div>
        <AboutSection/>
        <SiteFooter/>
      </div>
    </div>
  );
}; 

export default Home;
