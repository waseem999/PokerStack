
const LOAD_CHIPTOTAL = 'LOAD_CHIPTOTAL';

const initialState = { 
    chips: 0,
    user: ""
  };

export default function chipReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHIPTOTAL: 
       return Object.assign({}, state, { chips: action.chips, user: action.user});
    default: 
       return state;
  }
}