import { SHOW_ERROR, RESET_ERROR } from '../actions/types';

export default function(state=false, action){
  switch(action.type){
  case SHOW_ERROR:
    return true;
  case RESET_ERROR:
    return false;
  default:
    return state;    
  }
}
