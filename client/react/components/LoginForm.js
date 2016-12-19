import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
      username: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

handleChange(e) {
  this.setState({
      [e.target.type]: e.target.value
    });
  }


handleLogin(e) {
    e.preventDefault();
    axios.post('/api/sessions', {
      username: this.state.username,
      password: this.state.password
    })
  }


  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <form onSubmit={this.handleLogin}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="exampleInputusername1">username address</label>
              <input 
                onChange={this.handleChange} 
                value={this.state.username}
                type="username"
                className="form-control"
                id="exampleInputusername1"
                aria-describedby="usernameHelp"
                placeholder="Enter username" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    )
  }
}


