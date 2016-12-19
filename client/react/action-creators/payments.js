const LOAD_CHIPTOTAL= 'LOAD_CHIPTOTAL';
import axios from 'axios';

export const loadChiptotal = chips => {
return {
    type: LOAD_CHIPTOTAL,
    chips: chips
    }
};

export const getChipTotal = () => {
  return dispatch => {
    axios.get("/api/payments")
      .then(response => {
        dispatch(loadChiptotal(response.data));
      })
      .catch((error)=> console.error(error));
  };
};
