import React, { Component } from 'react';
import axios from 'axios';
import store from '../store';
import Preflop from './Preflop.jsx';
import Postflop from './Postflop.jsx';


export default class Game extends Component {

  constructor(props) {
    const initialState = {
      inputValue: 0,
      lowerbet: false,
      communitycards: [],
      turn: [],
      river: [],
      yourcards: [],
      villaincards: [],
      result : "",
      stage: 0,
      playerMove : false,
      showmovebuttons: false,
      currentBet: 0,
      villainAction : "",
      playerAction: "",
      playerhasActed: false,
      playerPairs : {},
      playerSpades : [],
      playerHearts : [],
      playerDiamonds : [],
      playerClubs : [],
      villainPairs : {},
      villainSpades : [],
      villainHearts : [],
      villainDiamonds : [],
      villainClubs : []
    }

    super(props);
    this.state = initialState;


    this.handleBet = this.handleBet.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.evaluateCards = this.evaluateCards.bind(this);
    this.handlePairs = this.handlePairs.bind(this);
    this.villainMove = this.villainMove.bind(this);
    }


  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

handlePairs(actor, handfilter){
  // this.setState(state => {
  //   const newState = Object.assign({}, state, {
  //         [actor] : { [handfilter[0].face] : handfilter}
  //           })

    this.setState((prevState, props) => ({
       [actor] : handfilter
    }));
      
}


handleCheck(e) {
    if(this.state.villainAction==="bet"){
      let call = this.state.currentBet;
      this.props.logBetAmount(this.props.potsize + call);
      let reducedbet = this.props.chips - call;
      this.props.modifyUserChips(reducedbet);

    this.setState(state => {
      let stage = this.state.stage + 1;
      const newState = Object.assign({}, state, {
          playerMove: true,
          playerhasActed: true,
          playerAction: "call",
          villainAction: false,
          stage: stage
      })
      return newState;
      })
    }
    else {
      this.setState(state => {
      const newState = Object.assign({}, state, {
          playerMove: false,
          playerhasActed: true,
          playerAction: "check"
      })
      return newState;
      })
    }
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
         currentBet: bet,
         playerAction: "bet",
         inputValue : 0
       });
      let pottotal = this.props.potsize + bet;
      this.props.logBetAmount(pottotal);
      reducedbet = this.props.chips - bet;
      this.props.modifyUserChips(reducedbet);
    }
  }

villainMove(){
  if(!this.state.playerMove && this.state.playerhasActed && this.state.playerAction !== "call"){
    this.setState({
         playerMove: true
       })
    this.heuristic()
  }
}


componentDidUpdate(){
		this.villainMove();
	}



evaluateCards(){
  //if (this.state.stage===1){}
  console.log("do we get here?")
  let playerhand = this.state.yourcards.concat(this.state.communitycards);
  let villainhand = this.state.villaincards.concat(this.state.communitycards);
  let playerhandstrengtharray = [];
  let playerhandstrength = 1;
  let villainhandstrength = 1;
  let result = "";

    for (let i = 0; i < playerhand.length; i++){
      let playerhandfilter = playerhand.filter((val, index)=>{
                return val.face===playerhand[i].face;
          });
      
      if(playerhandfilter.length > 1){
        this.handlePairs("playerPairs", playerhandfilter);
      }
    }

    for (let i = 0; i < villainhand.length; i++){
      
      let villainhandfilter = villainhand.filter((val, index)=>{
                return val.face===villainhand[i].face;
          });
      villainhandfilter.length > 1 ? villainhandstrength = villainhandfilter.length : null;
      if(villainhandfilter.length > 1){
        this.handlePairs("villainPairs", villainhandfilter);
      }
    }


// switch (playerhandstrength) {
//     case 4:
//         if (villainhandstrength===4){
//           result = "tie!"
//         }
//         else {
//           result = "You have 4 of a kind, you win!";
//           this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
//         }
//         break;
//     case 3:
//      if (villainhandstrength===3){
//           result = "tie!"
//         }
//     else if (villainhandstrength > 3){
//           result = "villain wins!";
//            this.props.logBetAmount(0);
//         }
//     else {
//         result = "You have 3 of a kind, you win!";
//         this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
//         this.props.logBetAmount(0);
//       }
//         break;
//     case 2:
//        if (villainhandstrength===2){
//           result = "tie!"
//         }
//       else if (villainhandstrength > 2){
//           result = "villain wins!";
//           this.props.logBetAmount(0);
//         }
//     else {
//         result = "You have a pair, you win!";
//         this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
//         this.props.logBetAmount(0);
//       }
//         break;
//     case 1:
//         if (villainhandstrength===1){
//           result = "tie!"
//         }
//       else if (villainhandstrength===2){
//           result = "villain wins with a pair!";
//            this.props.logBetAmount(0);
//         }
//       else {
//           result = "villain wins!";
//            this.props.logBetAmount(0);
//         }
//         break;
//   }
//  this.setState({
//    result : result
//  })
}

villainPreflopMove(){
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
      else if (this.state.villaincards[0].value + this.state.villaincards[1].value > 17 && this.state.playerAction==="bet"){
        this.villainCalls()
      }
      
      else if (this.state.playerAction==="bet"){
        this.villainFolds()
      }

      else if (this.state.playerAction==="check"){
        this.villainChecks()
      }
}

//LEFT OFF HERE EVALUATIING WHAT TO DO POST-FLOP!!!!
villainPostflopMove(){
 
  if(this.state.villainPairs){
    var villainpairs = this.state.villainPairs;
    if (villainpairs.length > 3){
      
    }
  }
}

heuristic(){
    if(this.state.stage===0){
      this.villainPreflopMove();
    }
    if(this.state.stage===1){
      this.villainPostflopMove();
    }
}

villainCalls(){
  this.props.logBetAmount(this.props.potsize);
    let reducedbet = this.props.villainchips - this.state.currentBet;
    this.props.modifyVillainChips(reducedbet);
    this.setState(state => {
      let stage = this.state.stage + 1;
      const newState = Object.assign({}, state, {
        playerMove: true,
        currentBet : 0,
        villainAction : "call",
        stage: stage
      })
        return newState;
  })
  this.evaluateCards();
  alert("VILLAIN CALLS");
}

villainChecks(){
  let stage = this.state.stage + 1;
   this.setState(state => {
          const newState = Object.assign({}, state, {
              playerMove: true,
              stage: stage
          })
          return newState;
        })
  this.evaluateCards();
  alert("VILLAIN CHECKS");

}

villainFolds(){
  this.setState(state => {
          const newState = Object.assign({}, state, {
            result: "Villain Folds, You Win!",
            playerMove: true,
            currentBet : 0,
            villainAction : "fold"
          })
          return newState;
        })
}

 dealCards(e) {
    axios.get('/api/game')
        .then( (cards)=> {
          this.setState(state => {
          const newState = Object.assign({}, state, {
            inputValue: 0,
            lowerbet: false,
            communitycards: [],
            turn: [],
            river: [],
            yourcards: [],
            villaincards: [],
            result : "",
            stage: 0,
            playerMove : false,
            showmovebuttons: false,
            currentBet: 0,
            villainAction : "",
            playerAction: "",
            playerhasActed: false,
            playerPairs : [],
            playerSpades : [],
            playerHearts : [],
            playerDiamonds : [],
            playerClubs : [],
            villainPairs : [],
            villainSpades : [],
            villainHearts : [],
            villainDiamonds : [],
            villainClubs : [],
            yourcards: cards.data.slice(0, 2),
            villaincards: cards.data.slice(2, 4),
            communitycards: cards.data.slice(4),
            playerMove: true
          })
          return newState;
          })
        })
        .then(()=> {
          
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
        {this.state.stage === 1 ? <Postflop handleChange={this.handleChange}
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
       {this.state.result ? (<div>
          <h2>{this.state.result}</h2>
       </div>) : null}
      </div>
    )
  }
};


