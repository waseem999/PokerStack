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
   let bet = parseInt(betvalue);
   store.dispatch(logBet(bet))
 }

handleSubmit(e) {
    e.preventDefault();
    const betvalue = this.state.inputValue;
     let bet = parseInt(betvalue);
    this.props.logBetAmount(bet);
  }


 render() {
   let user = this.props.user;
   let chips = this.props.chips;
   let potsize = this.props.potsize;
    return (
      <div className="row">
          <div className="col-xs-12 col-sm-12">
            <h1>Poker</h1>
          </div>
          <div className="col-xs-12 col-sm-12">
            <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="form-group">
                <label className="sr-only" htmlFor="bet">Bet</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.handleChange}
                      id="bet"
                      value={this.state.inputValue}
                      placeholder="Bet Amount" />
                    </div>
              </div>
                  <button type="submit" className="btn-sm btn-primary">Bet</button>
                  <button className="btn-sm btn-primary">
                      <span className="hidden-xs">Deal Cards</span>
                  </button>
            </form>
          </div>
          <div>
            <strong>Pot Size: {potsize}</strong>
          </div>
          <div>
            <strong>Your Chip Balance: {chips}</strong>
          </div>
      </div>
    )
  }
};


