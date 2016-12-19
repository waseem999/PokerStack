import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import PaymentsClass from '../components/PaymentsClass';

function mapStateToProps(state){
  let chips = state.payments.chips
 console.log("STATE?", state)
  return {
    chips
  }
}
  
function mapDispatchToProps(dispatch){
  return {
    ChipTotalFunction: function(){
      dispatch(getChipTotal())
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps)(PaymentsClass);