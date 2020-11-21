/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import LegalFooter from './LegalFooter';
import PageList from './PageList';

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="row column">
        <nav className="footer-nav">
          <PageList/>
        </nav>
      </div>
      <LegalFooter/>
    </footer>
  );
};

export default SiteFooter;
