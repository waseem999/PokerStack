import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import Preflop from './Preflop.jsx';
import Postflop from './Postflop.jsx';


export default class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: 0,
      lowerbet: false,
      communitycards: [],
      turn: [],
      river: [],
      yourcards: [],
      villaincards: [],
      result : "",
      stage: "preflop",
      playerMove : false,
      showmovebuttons: false,
      currentBet: 0,
      villainAction : "",
      playerAction: "",
      playerhasActed: false
    };

    this.handleBet = this.handleBet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.evaluateCards = this.evaluateCards.bind(this);
    }


  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleCheck(e) {
    // if(this.state.villainAction==="bet"){
    //   let call = this.props.currentBet;
    //   this.props.logBetAmount(bet);
    //   let reducedbet = this.props.chips - bet;
    //   this.props.modifyUserChips(reducedbet);

    this.setState(state => {
      const newState = Object.assign({}, state, {
          playerMove: false,
          playerhasActed: true,
          playerAction: "call"
      })
      return newState;
      })
    }
  

handleBet(e) {
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
         lowerbet: false,
         playerMove: false,
         playerhasActed : true,
         currentBet: bet
       });
      this.props.logBetAmount(bet);
      reducedbet = this.props.chips - bet;
      this.props.modifyUserChips(reducedbet);
        this.setState({
            inputValue : 0
        })
    }
  }

villainMove(){
  if(!this.state.playerMove && this.state.playerhasActed && this.state.playerAction !== "call"){
    this.heuristic()
  }
}


componentDidUpdate(){
		this.villainMove();
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


heuristic(){
    if(this.state.stage==="preflop"){
      if((this.state.villaincards[0].value === this.state.villaincards[1].value) || this.state.villaincards[0].value + this.state.villaincards[1].value > 22){
        let betamount = 25;
         this.props.logBetAmount(this.props.potsize + betamount);
        let reducedbet = this.props.villainchips - betamount - this.state.currentBet;
        this.props.modifyVillainChips(reducedbet);
        this.setState(state => {
          const newState = Object.assign({}, state, {
              playerMove: true,
              currentBet : betamount,
              villainAction : "bet"
          })
          return newState;
        })
        alert("VILLAIN BET " + betamount);
      }
      else if (this.state.villaincards[0].value + this.state.villaincards[1].value > 18){
        this.setState(state => {
          const newState = Object.assign({}, state, {
              playerMove: true,
              stage: "postflop"
          })
          return newState;
        })
        alert("VILLAIN CHECKS");

      }
    }
}



 dealCards(e) {
    axios.get('/api/game')
        .then( (cards)=> {
          this.setState(state => {
          const newState = Object.assign({}, state, {yourcards: cards.data.slice(0, 2),
          villaincards: cards.data.slice(2, 4),
          communitycards: cards.data.slice(4),
          playerMove: true
          })
          return newState;
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
   let villainchips = this.props.villainchips
  
    return (
      <div>
        <Preflop 
          handleChange={this.handleChange}
          handleCheck={this.handleCheck}
          handleBet={this.handleBet}
          dealCards={this.dealCards}
          evaluateCards={this.evaluateCards}
          potsize={potsize}
          chips={chips}
          user={user}
          villainchips={villainchips}
          currentBet={this.state.currentBet}
          playerMove={this.state.playerMove}
          inputValue={this.state.inputValue}
          lowerbet={this.state.lowerbet}
          communitycards={this.state.communitycards}
          yourcards={this.state.yourcards}
          villainAction={this.state.villainAction}
          villaincards={this.state.villaincards}
          result={this.state.result}
        />
        {this.state.stage === "postflop" ? <Postflop handleChange={this.handleChange}
          handleBet={this.handleBet}
          dealCards={this.dealCards}
          evaluateCards={this.evaluateCards}
          playerMove={this.state.playerMove}
          potsize={potsize}
          chips={chips}
          user={user}
          villainchips={villainchips}
          inputValue={this.state.inputValue}
          lowerbet={this.state.lowerbet}
          communitycards={this.state.communitycards}
          yourcards={this.state.yourcards}
          villaincards={this.state.villaincards}
          result={this.state.result}/> : null}
      </div>
    )
  }
};


