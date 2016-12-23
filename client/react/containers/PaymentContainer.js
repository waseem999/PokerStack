import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import PaymentsClass from '../components/PaymentsClass';
import Payments from '../components/Payments.jsx';
import { getUser, deleteUser } from '../action-creators/payments';


function mapStateToProps(state){
  let chips = state.payments.chips;
  let user = state.payments.user;


  return {
    chips, user 
  }
}
  
function mapDispatchToProps(dispatch){
  return {
    eraseUserFunction: function(){
      dispatch(deleteUser)
    },

    chipTotalFunction: function(){
      dispatch(getUser())
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(PaymentsClass);