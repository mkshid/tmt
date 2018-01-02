import { FETCH_SHOWS, RESET_SHOWS } from '../actions/types';

export default function(state={results: []}, action){
  switch(action.type){
  case FETCH_SHOWS:
    return {
      ...action.payload,
      results: state.results.concat(action.payload.results)
    };
  case RESET_SHOWS:
    return {results: []};
  default:
    return state;
  }
}
