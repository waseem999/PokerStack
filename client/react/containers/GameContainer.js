import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import GameClass from '../components/GameClass';
import { getUser, deleteUser, modifyChips, modVillainChips } from '../action-creators/payments';
import { logBet } from '../action-creators/bets';


function mapStateToProps(state){
  let chips = state.payments.chips;
  let user = state.payments.user;
  let potsize = state.bets.potsize;
  let villainchips = state.payments.villainchips


  return {
    chips, user, potsize, villainchips
  }
}
  
function mapDispatchToProps(dispatch){

      return {
        eraseUserFunction: function(){
          dispatch()
        },

        modifyUserChips: function(chips){
          dispatch(modifyChips(chips))
        },

         modifyVillainChips: function(chips){
          dispatch(modVillainChips(chips))
        },

        logBetAmount: function(bet){
          dispatch(logBet(bet));
      }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(GameClass);