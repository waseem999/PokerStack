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
      result : null,
      stage: 0,
      playerMove : false,
      showmovebuttons: false,
      currentBet: 0,
      villainAction : "",
      playerAction: "",
      playerhasActed: false,
      playerPairs : {},
      playerFlush : [],
      villainFlush : [],
      playerpairsobj: {},
      villainpairsobj: {}
    }

    super(props);
    this.state = initialState;


    this.handleBet = this.handleBet.bind(this);
    this.handleFold = this.handleFold.bind(this);
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

handlePairs(player){
let result = 0;
let pairvalues=[];
  player==="villain" ? pairvalues = Object.values(this.state.villainpairsobj) : 
  pairvalues = Object.values(this.state.playerpairsobj);
  console.log("THE PAIRVALUES SHOULD be an ARRAY of VALUES!", pairvalues)
    if (pairvalues.indexOf(4) !== -1){
      result=5
    }
    else if(pairvalues.indexOf(3) !== -1 && pairvalues.indexOf(2) !== -1){
      result=4
    }
    else if(pairvalues.indexOf(3) !== -1){
      result=3
    }
    else if(pairvalues.indexOf(2) !== -1){
        console.log("IM IN THE pair condition in handlePAIRS!", pairvalues)
      pairvalues.splice(pairvalues.indexOf(2), 1);
      console.log("NOW I SPLICED!", pairvalues)
      if (pairvalues.indexOf(2) !== -1){
        result=2
      }
      else result=1
    }
  return result
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
      this.setState((prevState, props) => {
      const newState = Object.assign({}, prevState, {playerMove: false,
        playerhasActed: true,
        playerAction: "check"
      })
      return newState;
      })
  }
}

handleFold(e){
  this.calculateWinnersChips("villain");
  this.setState({
  result : "Villain wins!!"
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
    if (this.state.stage === 4){
      this.showDown();
    }
	}



evaluateCards(){
  let playerhand = this.state.yourcards.concat(this.state.communitycards);
  let villainhand = this.state.villaincards.concat(this.state.communitycards);
  let villainflush = this.checkFlush(villainhand);
  if (villainflush){
     this.setState({
         villainFlush: villainflush
       })
  }
  
  if (this.state.stage > 1){
  playerhand = playerhand.concat(this.state.turn);
  villainhand = villainhand.concat(this.state.turn);
  let villainflush = this.checkFlush(villainhand);
  if (villainflush){
     this.setState({
         villainFlush: villainflush
       })
  }
  }
  if (this.state.stage > 2){
  playerhand = playerhand.concat(this.state.river);
  villainhand = villainhand.concat(this.state.river);
  let villainflush = this.checkFlush(villainhand);
  
  if (villainflush){
     this.setState({
         villainFlush: villainflush
       })
  }
  }

  let result = "";

    let playerpairsobj = {};
    playerhand.forEach((hand) => {
      if (playerpairsobj[hand.face]){
        playerpairsobj[hand.face] =  playerpairsobj[hand.face] + 1;
      }
      else {
         playerpairsobj[hand.face] = 1;
      }
    })
  
    let villainpairsobj = {};
    villainhand.forEach((hand) => {
      if (villainpairsobj[hand.face]){
        villainpairsobj[hand.face] =  villainpairsobj[hand.face] + 1;
      }
      else {
         villainpairsobj[hand.face] = 1;
      }

    })

  this.setState(state => {
      const newState = Object.assign({}, state, {
          playerpairsobj, villainpairsobj
      })
      return newState;
      })
    // for (let i = 0; i < playerhand.length; i++){
    //   let playerhandfilter = playerhand.filter((val, index)=>{
    //             return val.face===playerhand[i].face;
    //       });
      
    //   if(playerhandfilter.length > 1){
    //     this.handlePairs("playerPairs", playerhandfilter);
    //   }
    // }

    // for (let i = 0; i < villainhand.length; i++){
      
    //   let villainhandfilter = villainhand.filter((val, index)=>{
    //             return val.face===villainhand[i].face;
    //       });
    //   if(villainhandfilter.length > 1){
    //     this.handlePairs("villainPairs", villainhandfilter);
    //   }
    // }

}

villainPreflopMove(){

     if((this.state.villaincards[0].value === this.state.villaincards[1].value) || this.state.villaincards[0].value + this.state.villaincards[1].value > 22){
        this.villainBets(25)
      }
      else if (this.state.villaincards[0].value + this.state.villaincards[1].value > 16 && this.state.playerAction==="bet"){
        this.villainCalls()
      }
      
      else if (this.state.playerAction==="bet"){
        this.villainFolds()
      }

      else if (this.state.playerAction==="check"){
        this.villainChecks()
      }
}

villainPostflopMove(){
  let playerAction = this.state.playerAction;
  let villainPairs = this.handlePairs("villain");
  let playerPairs = this.handlePairs("player");
  if(this.state.villainPairs[0]){
    var villainpairs = this.state.villainPairs;
    if (villainpairs > 0){
      this.villainBets(Math.floor(this.props.potsize / 2) + 10)
    }
  }
  else if (playerAction=="bet" && !this.state.villainFlush[0]){
    this.villainFolds()
  }

  else if (playerAction=="bet" && this.state.villainFlush[0]){
    this.villainBets(Math.floor(this.props.potsize / 2))
  }

  else if (playerAction=="check"){
    this.villainChecks()
  }
}

villainTurnMove(){
  let playerAction = this.state.playerAction;
  let villainPairs = this.handlePairs("villain");
  if(villainPairs && this.state.playerAction!=="call"){
    if (villainPairs > 0){
      this.villainBets(Math.floor(this.props.potsize / 1.5))
    }
  }
  else if (playerAction=="bet"){
    this.villainFolds()
  }
  else{
    this.villainChecks()
  }
}

checkFlush(cards){
  let cardobj = {
    spades : 0,
    hearts : 0,
    clubs : 0,
    diamonds : 0
  }
  let flushmade = [];
  let flushdraw = [];
  cards.forEach((card)=>{
    
    cardobj[card.suit] = cardobj[card.suit] + 1;
    cardobj[card.suit]===5 ? flushmade = ["flush", card] : null;
    cardobj[card.suit]===4 ? flushdraw = ["flushdraw", card] : null
  })
 
  if (flushmade[0]) {
    return flushmade;
  }
  if (flushdraw[0]) {
    return flushdraw;
  }
}

villainRiverMove(){
  let playerAction = this.state.playerAction;
  if(this.state.villainPairs[0]){
    var villainpairs = this.state.villainPairs;
    if (villainpairs.length > 2){
      this.villainBets(this.props.potsize)
    }
    else if (villainpairs.length === 2){
      this.villainBets(Math.floor(this.props.potsize / 2))
    }
  }
  else if (playerAction=="bet"){
    this.villainFolds()
  }
  else if (playerAction=="check"){
    this.villainChecks()
  }
}

calculateWinnersChips(player){
  if (player==="user"){
    this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2))
  }
  else {
    this.props.modifyVillainChips(this.props.villainchips + (this.props.potsize * 2))
  }
    this.props.logBetAmount(0)
}

showDown(){
  let result = "";
  let stage = this.state.stage + 1;
  let villainPairs = this.handlePairs("villain");
  let playerPairs = this.handlePairs("player");
  console.log("PLAYERPAIRS at SHOWDOWN", playerPairs);
  console.log("VILLAINPAIRS at showdown", villainPairs);
  let playerFlush = this.checkFlush(this.state.yourcards.concat(this.state.communitycards))
  if (this.state.villainFlush[0]==="flush"){
    result = "Villain wins with a flush!";
    this.calculateWinnersChips("villain");
  }
  if (this.state.playerFlush[0]==="flush"){
    result = "You win with a flush!";
    this.calculateWinnersChips("user");
  }

else if (villainPairs > playerPairs){
  console.log("In the if conditition if Villain has more pairs")
  if (villainPairs===5){
  result = "Villain wins with 4 of a kind!!";
  this.calculateWinnersChips("villain");
  }
  else if (villainPairs===4){
    result = "Villain wins with a Full House!!";
    this.calculateWinnersChips("villain");
  }
  else if (villainPairs===3){
    result = "Villain wins with three of a kind!!";
    this.calculateWinnersChips("villain");
  }
  else if (villainPairs===2){
    result = "Villain wins with two pairs!!";
    this.calculateWinnersChips("villain");
  }
    else if (villainPairs===1){
    result = "Villain wins with a pair!!";
    this.calculateWinnersChips("villain");
  }
}
else if (playerPairs > villainPairs){
  console.log("In the if conditition if Player has more pairs")
  if (playerPairs===5){
  result = "Player wins with 4 of a kind!!";
  this.calculateWinnersChips("user");
  }
  else if (playerPairs===4){
    result = "Player wins with a Full House!!";
    this.calculateWinnersChips("user");
  }
  else if (playerPairs===3){
    result = "Player wins with three of a kind!!";
    this.calculateWinnersChips("user");
  }
  else if (playerPairs===2){
    result = "Player wins with two pairs!!";
    this.calculateWinnersChips("user");
  }
    else if (playerPairs===1){
    result = "Player wins with a pair!!";
    this.calculateWinnersChips("user");
  }
}
else if (playerPairs===villainPairs){
      if (playerPairs===3){
          if (this.state.villaincards[0].value + this.state.villaincards[1].value > this.state.yourcards[0].value + this.state.yourcards[1].value){
              result = "Villain's higher set wins!!";
            this.calculateWinnersChips("villain");
          }
          else {
            result = "Player's higher set wins!!";
            this.calculateWinnersChips("user");
          }
    }
    else if (playerPairs===2){
        if (this.state.villaincards[0].value + this.state.villaincards[1].value > this.state.yourcards[0].value + this.state.yourcards[1].value){
            result = "Villain's higher two pair wins!!";
          this.calculateWinnersChips("villain");
        }
        else {
          result = "Player's higher two pair wins!!";
          this.calculateWinnersChips("user");
        }
    }
    else if (playerPairs===1){
        if (this.state.villaincards[0].value + this.state.villaincards[1].value > this.state.yourcards[0].value + this.state.yourcards[1].value){
            result = "Villain's higher pair wins!!";
          this.calculateWinnersChips("villain");
        }
        else {
          result = "Player's higher pair wins!!";
          this.calculateWinnersChips("user");
        }
    }
    else {
       if (this.state.villaincards[0].value + this.state.villaincards[1].value > this.state.yourcards[0].value + this.state.yourcards[1].value){
            result = "Villain's higher card wins!!";
          this.calculateWinnersChips("villain");
        }
        else {
          result = "Player's higher card wins!!";
          this.calculateWinnersChips("user");
        }

    }
}

 this.setState({
   stage: stage,
   result : result
 })

}


heuristic(){
    if(this.state.stage===0){
      this.villainPreflopMove();
    }
    if(this.state.stage===1){
      this.villainPostflopMove();
    }
    if(this.state.stage===2){
      this.villainTurnMove();
    }
    if(this.state.stage===3){
      this.villainRiverMove();
    }
}


villainCalls(){
  this.props.logBetAmount(this.props.potsize + this.state.currentBet);
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
  console.log("VILLAIN CHECKS STATE", this.state)
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

villainBets(bet){
  this.props.logBetAmount(this.props.potsize + bet);
  let reducedbet = this.props.villainchips - bet - this.state.currentBet;
  this.props.modifyVillainChips(reducedbet);
  this.setState(state => {
          const newState = Object.assign({}, state, {
              playerMove: true,
              currentBet : bet,
              villainAction : "bet"
          })
          return newState;
        })
  alert("VILLAIN BET " + bet);
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
  this.props.modifyUserChips(this.props.chips + (this.props.potsize * 2));
  this.props.logBetAmount(0);
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
            result : null,
            stage: 0,
            playerMove : false,
            showmovebuttons: false,
            currentBet: 0,
            villainAction : "",
            playerAction: "",
            playerhasActed: false,
            playerPairs : [],
            villainPairs : [],
            playerFlush : [],
            villainFlush : [],
            playerpairsobj: {},
            villainpairsobj: {},
            yourcards: cards.data.slice(0, 2),
            villaincards: cards.data.slice(2, 4),
            communitycards: cards.data.slice(4, 7),
            turn: cards.data.slice(7, 8),
            river: cards.data.slice(8),
            playerMove: true
          })
          return newState;
          })
        })
        .then(()=> {
          this.props.logBetAmount(0);
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
          handleFold={this.handleFold}
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
        {this.state.stage > 0 ? <Postflop handleChange={this.handleChange}
          handleBet={this.handleBet}
          dealCards={this.dealCards}
          evaluateCards={this.evaluateCards}
          handleFold={this.handleFold}
          playerMove={this.state.playerMove}
          stage={this.state.stage}
          potsize={potsize}
          chips={chips}
          user={user}
          villainchips={villainchips}
          inputValue={this.state.inputValue}
          lowerbet={this.state.lowerbet}
          communitycards={this.state.communitycards}
          turn={this.state.turn}
          river={this.state.river}
          yourcards={this.state.yourcards}
          villaincards={this.state.villaincards}
          result={this.state.result}/> : null}
            {this.state.result ? (<div style={{ textAlign: "center"}}>
                <h2>{this.state.result}</h2>
            </div>) : null}
            <div style={{ textAlign: "center"}}>
                  <button className="btn-sm btn-custom" onClick={this.dealCards}>
                          <span className="hidden-xs">New Game</span>
                        </button>
                  <button type="submit" className="btn-sm btn-custom" 
                        onClick={ () => {location.href = '/'}}>Exit Game</button>  
            </div>
      </div>
    )
  }
};


