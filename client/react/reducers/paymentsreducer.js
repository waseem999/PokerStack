
const LOAD_USER = 'LOAD_USER';
const MODIFY_CHIPS = 'MODIFY_CHIPS';
const DELETE_USER = 'DELETE_USER';
const MODIFY_VILLAINCHIPS = "MODIFY_VILLAINCHIPS"

const initialState = { 
    chips: 0,
    user: "",
    villainchips: 500
  };

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case LOAD_USER: 
       return Object.assign({}, state, { chips: action.chips, user: action.user});
       break;

    case DELETE_USER:
      return Object.assign({}, state, initialState);
      break;
    
    case MODIFY_CHIPS:
      return Object.assign({}, state, {chips: action.chips});
      break;

    case MODIFY_VILLAINCHIPS:
      return Object.assign({}, state, {villainchips: action.chips});
      break;

    default: 
       return state;
  }
}