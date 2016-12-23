import React from 'react';
import axios from 'axios';

export default function (props) {
  let chips = props.chips;
return (
    <div className="row">
        <div className="col-md-4 col-md-offset-4">

            <form onSubmit={props.chipAdd}>
                <div className="form-group">
                  <h4>Purchase Additional Chips</h4>
                    <label htmlFor="username">Enter Quantity:   </label>
                    <input
                      value={props.chipBalance}
                      onChange={props.handleChange}
                      type="number"
                      name="chipBalance"
                      id="chipBalance"
                      aria-describedby="usernameHelp"
                      placeholder="Enter Chip Quantity" />
                </div>
              <button type="submit" className="btn btn-primary">Add Chips</button>
            </form>
        </div>
      </div>
    )
}