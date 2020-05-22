// import React from "react";
import React, { useState } from 'react';
import api from '../utils/api';

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

const Login = ( props ) => {
  const [ data, setData ] = useState( {
    username: "",
    password: ""
  } );

  const handleChange = e => {
    setData( {
      ...data,
      [ e.target.name ]: e.target.value
    } );
  };

  // --------------- POST FOR LOGIN --------------- //
  const handleSubmit = e => {
    e.preventDefault();
    api()
      .post( "/api/login", data )
      .then( result => {
        window.localStorage.setItem( 'token', result.data.payload );
        props.history.push( '/bubbles' );
      } )
      .catch( err => {
        console.log( err );
      } );
  };

  return (

    <div className="Main-Container">
      <h1 className="Main-title">Bubble App!</h1>
      {/* <p>Build a login page here</p> */ }
      <form className="loginForm" onSubmit={ handleSubmit }>
        <h2>Login</h2>
        <input
          type="text"
          name="username"
          // width="200px"
          value={ data.username }
          onChange={ handleChange }
          placeholder="username"

        />
        <br />
        <input
          type="password"
          name="password"
          value={ data.password }
          onChange={ handleChange }
          placeholder="password"
        />
        <br />
        <button className="submit-login" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
