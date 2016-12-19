import React, { Component } from 'react';
import axios from 'axios';


const SignupForm = (props) => (

    <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Signup</h1>
          <form onSubmit={props.createUser}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                value={props.username}
                onChange={props.handleChange}
                type="username"
                name="username"
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                value={props.password}
                onChange={props.handleChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmation_password">Confirm Password</label>
              <input
                value={props.confirmPassword}
                onChange={props.handleChange}
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary" 
            onClick={ () => {location.href = '/login'}}>Create Account</button>
          </form>
        </div>
      </div>
  );

export default SignupForm;
 
