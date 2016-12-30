import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar.jsx';


const Home = () => (
 
      <div className="App">
        <Navbar/>
        <div className="App-header">
          <img src={"/stylesheets/playingcards/ace_of_hearts.png"} className="App-logo" alt="logo" />
          <h2>Let's Play Poker!</h2>
        </div>
        <div>
          <ul className="list-group">
              <li className="list-group-item">Welcome to Poker Spot! When you register you start off with 500 chips.</li>
              <li className="list-group-item">One in 3 random lucky people start off with 1000 chips!</li>
            <li className="list-group-item">If your final score is above 750 you earn a spot on our Leaderboard for a chance to win some sort of prize!</li>
          </ul>
        </div>
          <Link type="button" className="btn btn-danger" to="/game">JOIN GAME!</Link>
      </div>
  
);

export default Home;
