import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import {connect} from 'react-redux';
import Payments from './Payments.jsx';
import { Link } from 'react-router';
import Navbar from './Navbar.jsx';
import PurchaseChips from './PurchaseChips';
import DeleteAccount from './DeleteAccountButton';


//consider using componentdidmount instead of loading using onEnter to fix async

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentType: '',
      accountNumber: '',
      chipBalance: 0
     
    }
    this.createAccount = this.createAccount.bind(this);
    this.handleChange = this.handleChange.bind(this);
     this.handleChange = this.handleChange.bind(this); this.chipAdd = this.chipAdd.bind(this);
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

  chipAdd(e) {
    e.preventDefault();
    let chipBalance = parseInt(this.state.chipBalance);
    axios.put('/api/payments', {
      chipBalance: chipBalance
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
  if (this.props.user){
    const paymentType = this.state.paymentType;
    const accountNumber = this.state.accountNumber;
    const chipBalance = this.state.chipBalance;
    return (
      <div>
        <Navbar />
          <Payments 
          handleChange={this.handleChange}
          createAccount={this.createAccount}
          paymentType={paymentType}
          accountNumber={accountNumber}
          user={this.props.user}
    
          />
          <PurchaseChips 
            chipAdd={this.chipAdd}
            user={this.props.user}
            chipBalance={chipBalance}
            handleChange={this.handleChange}
            />
          <DeleteAccount
            handleDelete={this.handleDelete}
          />
      </div>
    );
    }
  else {
    return (
      <div>
        <Navbar />
          <h1>Please Login First!</h1>
      </div>)
  }
}
}