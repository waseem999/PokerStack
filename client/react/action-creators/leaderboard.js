const LOAD_LEADERBOARD= 'LOAD_LEADERBOARD';
import axios from 'axios';

export const loadLeadeboard = users => {
return {
    type: LOAD_LEADERBOARD,
    users: users
    }
};

export const getLeaderboardPlayers = () => {
  return dispatch => {
    axios.get("/api/leaderboard")
      .then(response => {
        console.log("USERS AFTER AXIOS", response.data)
        dispatch(loadLeadeboard(response.data));
      })
      .catch((error)=> console.error(error));
  };
};
