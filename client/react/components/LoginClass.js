
import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  createUser(e) {
    let username = this.state.username;
    let password = this.state.password;

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


    return (
        <LoginForm  
        handleChange={this.handleChange}
        createUser={this.createUser}
        username={username}
        password={password}
    
        />
    );
    }
}