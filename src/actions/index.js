import axios from 'axios';
import {
  isEmpty as l_isEmpty,
  isUndefined as l_isUndefined
} from 'lodash';

import {
  FETCH_SHOWS, RESET_SHOWS,
  START_LOADING, STOP_LOADING,
  NEXT_SHOWS, PREV_SHOWS, RESET_CONTROLS,
  SHOW_ERROR, RESET_ERROR
} from './types';
import { PROJECT_NAME, API_KEY as api_key, BASE_URL } from '../settings';


function _fetch_shows(params, page, history){
  const time = params.time.split('-');
  const type = params.type === 'series'? 'tv' : params.type;
  let gte = parseInt(time[0], 10);
  let lte = parseInt(time[1], 10);
  const genres = (l_isUndefined(params.genres) ? '' :
                  params.genres.split(',').join('|'));

  gte = !isNaN(gte) ? gte : history.push(`${PROJECT_NAME}/`);
  lte = !isNaN(lte) ? lte : '';

  return axios.get(`${BASE_URL}/discover/${type}`, {
    params: {
      api_key,
      'with_runtime.gte': gte,
      'with_runtime.lte': lte,
      'with_genres': genres,
      page: page
    }
  });
}


export function fetchShows(params, page, history){
  return function (dispatch){
    dispatch({type: START_LOADING});
    _fetch_shows(params, page, history)
      .then(({data}) => {
        dispatch({type: STOP_LOADING});
        if (l_isEmpty(data.results)){
          setTimeout(() => history.push(`${PROJECT_NAME}`), 3000);
        }
        return dispatch({type: FETCH_SHOWS, payload: data});
      })
      .catch(err => {
        dispatch({type: STOP_LOADING});
        dispatch({type: SHOW_ERROR});
        setTimeout(() => history.push(`${PROJECT_NAME}`), 3000);
      });
  };
}

export function nextShows(params, shows, end, page, history){
  const new_start = end;
  const new_end = end + 8;

  return function(dispatch, getState){
    dispatch({type: START_LOADING});
    if (new_end > shows.results.length) {
      page = parseInt(page, 10) + 1;
      _fetch_shows(params, page, history)
        .then(({data}) => {
          dispatch({type: STOP_LOADING});
          dispatch({type: FETCH_SHOWS, payload: data});
          return dispatch({
            type: NEXT_SHOWS,
            payload: {page: page, start: new_start , end: new_end}
          });
        })
        .catch(err => {
          dispatch({type: STOP_LOADING});
          dispatch({type: SHOW_ERROR});
          setTimeout(() => history.push(`${PROJECT_NAME}`), 3000);
        });
    }
    else {
      dispatch({type: STOP_LOADING});
      return dispatch({
        type: NEXT_SHOWS,
        payload: {page: page, start: new_start , end: new_end}
      });
    }
    return null;
  };
}

export function prevShows(start){
  return (dispatch) => dispatch({
    type: PREV_SHOWS,
    payload: {start: start - 8 , end: start}
  });
}

export function resetState(){
  return (dispatch) => {
    dispatch({type: RESET_SHOWS});
    dispatch({type: RESET_CONTROLS});
    dispatch({type: RESET_ERROR});
  };
}
