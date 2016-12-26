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
          <div className="col-xs-12 col-sm-12">
            <h1>Poker</h1>
          </div>
          <div className="col-xs-4 col-sm-4">
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
              <button type="submit" className="btn-sm btn-primary">Bet</button>
            </form>
            </div>
               <button className="btn-sm btn-primary">
                  <i className="icon icon-font"></i> 
                  <span className="hidden-xs">Check</span>
              </button>
        
             <button className="btn-sm btn-primary">
                <i className="icon icon-font"></i> 
                <span className="hidden-xs">Fold</span>
            </button>
      </div>
    )
  }
};


