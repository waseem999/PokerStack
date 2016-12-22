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


handleDelete(e) {
    e.preventDefault();
    axios.delete('/api/payments')
    .then( ()=> {}
    )};

  
render(){
    const paymentType = this.state.paymentType;
    const accountNumber = this.state.accountNumber;
    return (
        <Payments 
        handleChange={this.handleChange}
        createAccount={this.createAccount}
        paymentType={paymentType}
        accountNumber={accountNumber}
        user={this.props.user}
        handleDelete={this.handleDelete}
        />
    );
    }
}