
const LOAD_LEADERBOARD= 'LOAD_LEADERBOARD';

const initialLeaderboardState = {
  users: []
};

export default function leaderboardReducer (state = initialLeaderboardState, action) {
  switch (action.type) {
    case LOAD_LEADERBOARD: 
       return Object.assign({}, state, { users: action.users});
    default: 
       return state;
  }
}