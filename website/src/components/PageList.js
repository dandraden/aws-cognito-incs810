/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import { Link } from 'react-router-dom';

const PageList = () => {
    const pages = [
        { url: '/', title: 'Home' },
        { url: '/register', title: 'Register' },
        { url: '/signin', title: 'Sign-In' },
        { url: '/profile', title: 'Profile' },
        { url: '/logout', title: 'Log Out' }
    ];

    return (
      <ul>
        {
          pages.map((v, i) => (
            <li key={i}><Link to={v.url}>{v.title}</Link></li>
          ))
        }
      </ul>
    );
};

export default PageList;
