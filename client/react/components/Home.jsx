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
              <li className="list-group-item">Welcome to Poker Stack!</li>
          </ul>
        </div>
          <Link type="button" className="btn btn-danger" to="/game">JOIN GAME!</Link>
      </div>
  
);

export default Home;
