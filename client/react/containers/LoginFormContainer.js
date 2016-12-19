import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import LoginClass from '../components/LoginClass';

function mapStateToProps(state){
  let users = state.leaderboard.users
 
  return {
    users
  }
}
  
function mapDispatchToProps(dispatch){
  return {
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(SignupClass);
