import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import Leaderboard from '../components/Leaderboard';
import { getLeaderboardPlayers } from '../action-creators/leaderboard';


function mapStateToProps(state){
  console.log("STATE", state)
  let users = state.leaderboard.users
 
  return {
    users
  }
}
  
function mapDispatchToProps(dispatch){
  return {
    getLeaderboardUsers: function(){
      dispatch(getLeaderboardPlayers())
    }
  }
}

  
export default connect(
  mapStateToProps, 
  mapDispatchToProps)(Leaderboard);