
import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
//import LoginForm from './LoginForm';
import Navbar from './Navbar.jsx';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(e) {
    let username = this.state.username;
    let password = this.state.password;
    e.preventDefault();
    axios.post('/api/login', {
      username: username,
      password: password
    })
    .then( ()=> {}
    )};


handleChange(e) {
  this.setState({
      [e.target.id]: e.target.value
    });
  }
  
render(){
    const username = this.state.username;
    const password = this.state.password;


    return (
      <div>
        <Navbar />
            <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <h1>Login</h1>
              <form onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input 
                    onChange={this.handleChange} 
                    value={this.state.username}
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="usernameHelp"
                    placeholder="Enter Username" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Password"/>
                </div>
                  <button type="submit" className="btn btn-primary" 
                  onClick={ () => {location.href = '/payments'}}>Login</button>         
              </form>
            </div>
          </div>
      </div>
    );

  
    }
}