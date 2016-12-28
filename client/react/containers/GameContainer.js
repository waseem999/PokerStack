import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import GameClass from '../components/GameClass';
import { getUser, deleteUser } from '../action-creators/payments';
import { logBet } from '../action-creators/bets';


function mapStateToProps(state){
  let chips = state.payments.chips;
  let user = state.payments.user;
  let potsize = state.bets.potsize;


  return {
    chips, user, potsize
  }
}
  
function mapDispatchToProps(dispatch){
      return {
        eraseUserFunction: function(){
          dispatch(deleteUser)
        },

        getUserFunction: function(){
          dispatch(getUser())
        },

        logBetAmount: function(bet){
          dispatch(logBet(bet));
      }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(GameClass);