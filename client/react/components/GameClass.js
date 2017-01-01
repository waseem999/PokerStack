import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';



export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      lowerbet: false,
      communitycards: [],
      yourcards: [],
      villaincards: [],
      result : ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.evaluateCards = this.evaluateCards.bind(this);
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
       this.setState({
            inputValue : 0
        })
     }
    else {
      this.setState({
         lowerbet: false
       });
      this.props.logBetAmount(bet);
      reducedbet = this.props.chips - bet;
      this.props.modifyUserChips(reducedbet);
        this.setState({
            inputValue : 0
        })
    }
  }

evaluateCards(){
  let playerhand = this.state.yourcards.concat(this.state.communitycards);
  let villainhand = this.state.villaincards.concat(this.state.communitycards);
  let playerhandstrengtharray = [];
  let playerhandstrength = 1;
  let villainhandstrength = 1;
  let result = "";

    for (let i = 0; i < 5; i++){
      let playerhandfilter = playerhand.filter((val, index)=>{
                return val.face===playerhand[i].face;
          });
      playerhandfilter.length > 1 ? playerhandstrength = playerhandfilter.length : null;
    }

      for (let i = 0; i < 5; i++){
      let villainhandfilter = villainhand.filter((val, index)=>{
                return val.face===villainhand[i].face;
          });
      villainhandfilter.length > 1 ? villainhandstrength = villainhandfilter.length : null;
    }
switch (playerhandstrength) {
    case 4:
        if (villainhandstrength===4){
          result = "tie!"
        }
        else {
          result = "You have 4 of a kind, you win!";
          this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
        }
        break;
    case 3:
     if (villainhandstrength===3){
          result = "tie!"
        }
    else if (villainhandstrength > 3){
          result = "villain wins!";
           this.props.logBetAmount(0);
        }
    else {
        result = "You have 3 of a kind, you win!";
        this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
        this.props.logBetAmount(0);
      }
        break;
    case 2:
       if (villainhandstrength===2){
          result = "tie!"
        }
      else if (villainhandstrength > 2){
          result = "villain wins!";
          this.props.logBetAmount(0);
        }
    else {
        result = "You have a pair, you win!";
        this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
        this.props.logBetAmount(0);
      }
        break;
    case 1:
        if (villainhandstrength===1){
          result = "tie!"
        }
      else if (villainhandstrength===2){
          result = "villain wins with a pair!";
           this.props.logBetAmount(0);
        }
      else {
          result = "villain wins!";
           this.props.logBetAmount(0);
        }
        break;
  }
 this.setState({
   result : result
 })
}


 dealCards(e) {

    axios.get('/api/game')
        .then( (cards)=> {
          this.setState({
            yourcards: cards.data.slice(0, 2),
            villaincards: cards.data.slice(2, 4),
            communitycards: cards.data.slice(4)
          })
        })
        .then(()=> {
          this.evaluateCards();
        })
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
            </form>
          </div>
          {
            this.state.lowerbet ? <strong>REDUCE YOUR BET AMOUNT</strong> : null
          }
          <div>
            <strong>Pot Size: {potsize}</strong>
          </div>
          <div>
            <strong>{user} Chip Balance: {chips}</strong>
          </div>
                  <button className="btn-sm btn-custom" onClick={this.dealCards}>
                      <span className="hidden-xs">Deal Cards</span>
                  </button>
                 
            <div>
               {
               this.state.yourcards[0] && 
                      (
                       <table width="700">
                          <thead>
                                <tr>
                                  <th>Your Cards</th>
                                  <th>Villain's Cards</th>
                                </tr>
                          </thead>
                          <tbody>
                                  <tr>
                                    <td><img src={this.state.yourcards[0].image} className="Image-logo"/><img src={this.state.yourcards[1].image} className="Image-logo"/></td>
                                 
                                    <td><img src={this.state.villaincards[0].image} className="Image-logo"/><img src={this.state.villaincards[1].image} className="Image-logo"/></td>
                                  </tr>
                          </tbody>
                          <thead>
                            <tr><strong>Community Cards</strong></tr>
                          </thead>
                          <tbody>
                                <tr>
                                    <td><img src={this.state.communitycards[0].image} className="Image-logo"/><img src={this.state.communitycards[1].image} className="Image-logo"/><img src={this.state.communitycards[2].image} className="Image-logo"/></td>
                              </tr>
                              
                              <div>
                                <h2>{this.state.result}</h2>
                              </div>
                          </tbody>
                  </table>
                      )
               }
            </div>
            <div>
            <button type="submit" className="btn-sm btn-custom" 
                  onClick={ () => {location.href = '/'}}>Exit Game</button>   
            </div>
        </div>

    )
  }
};


