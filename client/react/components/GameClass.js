import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';



export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      lowerbet: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }


  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }


handleSubmit(e) {
    e.preventDefault();
    const betvalue = this.state.inputValue;
     let bet = parseInt(betvalue);
     let reducedbet;
     if (bet > this.props.chips){
       this.setState({
         lowerbet: true
       })
       this.state.inputValue = 0;
     }
    else {
      this.setState({
         lowerbet: false
       });
      this.props.logBetAmount(bet);
      reducedbet = this.props.chips - bet;
      this.props.modifyUserChips(reducedbet);

    }
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
                  <button type="submit" className="btn-sm btn-custom">Bet</button>
                  <button className="btn-sm btn-custom">
                      <span className="hidden-xs">Deal Cards</span>
                  </button>
            </form>
          </div>
          {
            this.state.lowerbet ? <strong>REDUCE YOUR BET AMOUNT</strong> : null
          }
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


