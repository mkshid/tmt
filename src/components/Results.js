import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  isEmpty as l_isEmpty,
} from 'lodash';

import { fetchShows, nextShows, prevShows } from '../actions';
import './Results.css';
import ScrollToTopButton from './ScrollToTopButton';
import { PROJECT_NAME } from '../settings';


class Results extends Component {

  constructor (props){
    super(props);

    this.state = {
      data: { results: [] },
      start: 0, end: 8,
      page: 1, loading: true,
      error: false, hide_next: false
    };
  }

  componentWillMount(){
    document.body.className = 'bg third';
    const { match: { params }, history } = this.props;
    this.props.fetchShows(params, this.state.page, history);
  }

  render(){
    const {match: { params }, history,
           shows, loading, page, start, end,
           nextShows, prevShows
          } = this.props;
    const type = params.type === 'series'? 'tv' : params.type;

    if(loading){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
        </div>
      );
    }
    // if (error){
    //   return(
    //     <div className='container'>
    //       <h1 className='error'>
    //         An error occurred. Try later... redirecting...
    //       </h1>
    //     </div>
    //   );
    // }
    if (l_isEmpty(shows.results)){
      return(
        <div className='container'>
          <h1>Sorry there are any results... redirecting...</h1>
        </div>
      );
    }
    const reduced_results = shows.results.slice(start, end);
    const results = reduced_results.map((film) => {
      const title = film.hasOwnProperty('title') ? film.title : film.name;
      return(
      <div className='film' key={film.id}>
        <div className='info'>
          <div className='vote'>{film.vote_average}/10</div>
          <div className='title'>{title}</div>
          <div className='more'
               onClick={() => history.push(
            `${PROJECT_NAME}/detail/${type}/${film.id}`)}
            > More... </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
             alt={film.title}
             />
      </div>
      );});

    return(
      <div className='container'>
        <h1> So here are your results...</h1>
        <h4> {start === 0?start + 1:start} -
          {end > shows.results.length?shows.results.length: end}
          {' '} / {' '}
          {shows.total_results}</h4>
        <div className='results-container'>
          <ReactCSSTransitionGroup
             transitionName='film-container'
             transitionEnterTimeout={500}
             transitionLeaveTimeout={300}
             className='film-container'>
            {results}
          </ReactCSSTransitionGroup>
          <span
             className='prev-movies pointer'
             onClick={()=>prevShows(start)}
            hidden={start === 0 ? true : false }>
            <div className='icon arrow-left' aria-hidden='true'></div>
          </span>
          <span
             className='next-movies pointer'
             hidden={reduced_results.length < 8 ? true : false}
             onClick={()=>nextShows(params, shows, end, page, history)}>
            <div className='icon arrow-right' aria-hidden='true'></div>
          </span>
          <ScrollToTopButton scrollStepInPx="50" delayInMs="16.66"/>
        </div>
        <div>
        </div>
      </div>
    );

  }
}

function mapStateToProps( {
  shows, loading,
  control: {start, end, page }}){
  return {shows, loading, start, end, page};
}

export default connect(mapStateToProps, {
  fetchShows, nextShows, prevShows
})(Results);
