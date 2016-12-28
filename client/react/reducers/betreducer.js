
const LOG_BET = 'LOG_BET';

const initialState = { 
    potsize: 0
  };

export default function betReducer (state = initialState, action) {
  switch (action.type) {
    case LOG_BET: 
       return Object.assign({}, state, { potsize: action.bet});
    default: 
       return state;
  }
}