import {
  NEXT_SHOWS, PREV_SHOWS,
  RESET_CONTROLS
} from '../actions/types';

export default function(state={start: 0, end: 8, page: 1}, action){
  switch(action.type){
  case NEXT_SHOWS:
    return {
      ...state,
      ...action.payload
    };
  case PREV_SHOWS:
    return {
      ...state,
      ...action.payload
    };
  case RESET_CONTROLS:
    return {start: 0, end: 8, page: 1};
  default:
    return state;
  }
}
