import { NEXT_SHOWS, PREV_SHOWS } from '../actions/types';

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
  default:
    return state;
  }
}
