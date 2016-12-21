import React, { Component } from 'react';
import axios from 'axios';


const LoginForm = (props) => (
  
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={props.handleLogin}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="exampleInputusername1">username address</label>
              <input 
                onChange={props.handleChange} 
                value={props.username}
                type="username"
                className="form-control"
                id="exampleInputusername1"
                aria-describedby="usernameHelp"
                placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={props.handleChange}
                value={props.password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary" 
            onClick={ () => {location.href = '/payments'}}>Login</button>
          </form>
        </div>
      </div>
    );

export default LoginForm;
 

