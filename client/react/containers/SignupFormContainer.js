import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import SignupClass from '../components/SignupClass';

function mapStateToProps(state){
  let users = state.leaderboard.users
 
  return {
    users
  }
}
  
function mapDispatchToProps(dispatch){
  return {
    // getLeaderboardUsers: function(){
    //   dispatch(getLeaderboardPlayers())
    // }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(SignupClass);

