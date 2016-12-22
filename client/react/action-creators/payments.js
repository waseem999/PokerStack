const LOAD_USER= 'LOAD_USER';
const DELETE_USER= 'DELETE_USER';
import axios from 'axios';

export const loadUser = user => {
return {
    type: LOAD_USER,
    user: user
    }
};

export const getUser = () => {
  return dispatch => {
    axios.get("/api/payments")
      .then(response => {
         let username = response.data[0].username;
        dispatch(loadUser(username));
      })
      .catch((error)=> console.error(error));
  };
};


export const deleteUser = () => {
return {
    type: DELETE_USER
    }
};

