
import betReducer from './betreducer';
import leaderboardReducer from './leaderboardreducer';
import {combineReducers} from 'redux';
import paymentsReducer from './paymentsreducer';


export default combineReducers({
  bets: betReducer,
  leaderboard: leaderboardReducer,
  payments: paymentsReducer
});