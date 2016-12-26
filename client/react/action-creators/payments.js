const LOAD_USER= 'LOAD_USER';
const DELETE_USER= 'DELETE_USER';
import axios from 'axios';

export const loadUser = (user, chips) => {
return {
    type: LOAD_USER,
    user: user,
    chips: chips
    }
};

export const getUser = () => {
  return dispatch => {
    axios.get("/api/payments")
      .then(response => {
         let username = response.data[0].user.username;
         let chips = response.data[0].chiptotal;
        dispatch(loadUser(username, chips));
      })
      .catch((error)=> console.error(error));
  };
};


export const deleteUser = () => {
return {
    type: DELETE_USER
    }
};

