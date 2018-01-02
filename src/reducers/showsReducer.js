import { FETCH_SHOWS } from '../actions/types';

export default function(state={results: []}, action){
  switch(action.type){
  case FETCH_SHOWS:
    return {
      ...action.payload,
      results: state.results.concat(action.payload.results)
    };
  default:
    return state;
  }
}
