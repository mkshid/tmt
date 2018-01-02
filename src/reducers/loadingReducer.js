import { STOP_LOADING, START_LOADING } from '../actions/types';


export default function(state=false, action){
  switch(action.type){
  case STOP_LOADING:
    return false;
  case START_LOADING:
    return true;
  default:
    return state;    
  }
}
