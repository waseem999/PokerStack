/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import style from '../../public/stylesheets/main.scss'; 
import App from './components/App.jsx';
import SignupClass from './components/SignupClass';
import Home from './components/Home.jsx';
import LoginClass from './components/LoginClass';
import Game from './containers/GameContainer';
//import Payment from './containers/PaymentContainer';
import Leaderboard from './containers/LeaderboardContainer';
import PaymentContainer from './containers/PaymentContainer';
import { Provider } from 'react-redux';
import {getUser} from './action-creators/payments';
import store from './store';


const loadUserOnEnter = function() {
  store.dispatch(getUser());
}

const rootRouter = 
  <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={App} >
          <IndexRoute component={Home} />
          <Route path="/signup" component={SignupClass}/>
          <Route path="/login" component={LoginClass} />
          <Route path="/leaderboard" component={Leaderboard} />
          <Route path="/payments" component={PaymentContainer} onEnter={loadUserOnEnter}/>
          <Route path="/game" component={Game} onEnter={loadUserOnEnter}/>
        </Route>
      </Router>
  </Provider>;


render(rootRouter, 
document.getElementById('app'));
