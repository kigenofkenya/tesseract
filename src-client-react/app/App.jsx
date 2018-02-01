import React, { Component } from 'react';
import cat from 'images/cat';
import dog from 'images/dog';
import dogs from 'images/dogs';

const hello = () => {
  return (
    <div className="container">
      <h2 id="heading">Hello React Reborn</h2>
      <div className="image-wrapper">
        <img src={cat} className="image-wrapper__image" alt=""/>
      </div>

      <div className="image-wrapper">
        <img src={dog} className="image-wrapper__image" alt=""/>
      </div>

      <div className="image-wrapper">
        <img src={dogs} className="image-wrapper__image" alt=""/>
      </div>

    </div>
  )
}

export default hello;
