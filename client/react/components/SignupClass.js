
import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import SignupForm from './SignupForm.jsx';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.createUser = this.createUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createUser(e) {
    let username = this.state.username;
    let password = this.state.password;
    console.log("USERNAME??", username);

    e.preventDefault();
    axios.post('/api/users', {
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
    const confirmPassword = this.state.confirmPassword;

    return (
        <SignupForm
        handleChange={this.handleChange}
        createUser={this.createUser}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        />
    );
    }
}