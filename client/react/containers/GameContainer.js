import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import { logBet } from '../action-creators/bets';


export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0
    };
    this.getBetAmount = this.getBetAmount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }


 getBetAmount(betvalue){
   store.dispatch(logBet(betvalue))
 }

handleSubmit(e) {
    e.preventDefault();
    const betvalue = this.state.inputValue;
    this.getBetAmount(betvalue)
  }


 render() {
    return (
      <div className="row">
        <div className="col-xs-6 col-sm-3">
          <h1>Poker</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="bet">Bet</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                id="bet"
                value={this.state.inputValue}
                placeholder="Bet Amount" />
            </div>
            <button type="submit" className="btn btn-primary">Bet</button>
          </form>



          <form onSubmit={() => {console.log("check")}}>
              <button type="submit" className="btn btn-primary">Check</button>
          </form>

          <form onSubmit={() => {console.log("check")}}>
              <button type="submit" className="btn btn-primary">Fold</button>
          </form>

        </div>
      </div>
    )
  }
};


