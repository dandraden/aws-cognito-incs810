/*
 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';

const DynamicImage = (props) => {
  const altText = props.alt || "dynamic image";
  const mystyle = {
    width: "250px",
    padding: "10px"
  };
  return (
    <img src={require('../images/' + props.src )} alt={altText} style={mystyle}/>
  );
};

export default DynamicImage;
