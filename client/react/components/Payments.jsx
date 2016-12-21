import React from 'react';
import axios from 'axios';

export default function (props) {
return (
    <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <h1>Signup</h1>
          <form onSubmit={props.createAccount}>
            <div className="form-group">
              <label htmlFor="username">Enter Account Type</label>
              <input
                value={props.paymentType}
                onChange={props.handleChange}
                type="paymentType"
                name="paymentType"
                className="form-control"
                id="paymentType"
                aria-describedby="usernameHelp"
                placeholder="Enter Account Type" />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Enter Account Number</label>
              <input
                value={props.accountNumber}
                onChange={props.handleChange}
                type="accountNumber"
                className="form-control"
                id="accountNumber"
                placeholder="accountNumber" />
            </div>
            <button type="submit" className="btn btn-primary" 
            onClick={ () => {location.href = '/'}}>Create Account</button>
          </form>
        </div>
      </div>
    )

}