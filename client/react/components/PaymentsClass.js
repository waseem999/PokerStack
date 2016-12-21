import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import Payments from './Payments.jsx';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: '',
      accountNumber: '',
     
    }
    this.createAccount = this.createAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createAccount(e) {
    let paymentType = this.state.paymentType;
    let accountNumber = this.state.accountNumber;
    e.preventDefault();
    axios.post('/api/payments', {
      paymentType: paymentType,
      accountNumber: accountNumber
    })
    .then( ()=> {}
    )};


handleChange(e) {
  this.setState({
      [e.target.id]: e.target.value
    });
  }
  
render(){
    const paymentType = this.state.paymentType;
    const accountNumber = this.state.accountNumber;
    console.log("PROPS?", this.props)
   

    return (
        <Payments 
        handleChange={this.handleChange}
        createAccount={this.createAccount}
        paymentType={paymentType}
        accountNumber={accountNumber}
        />
    );
    }
}