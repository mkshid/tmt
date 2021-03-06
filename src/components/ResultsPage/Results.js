import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import { isEmpty as l_isEmpty} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Results.css';
import Film from '../Film';
import ScrollToTopButton from '../ScrollToTopButton';
import { fetchShows, nextShows, prevShows } from '../../actions';


class Results extends Component {

  componentWillMount(){
    document.body.className = 'bg third';
    const { match: { params }, history, end, page } = this.props;
    if (end === 8){
      this.props.fetchShows(params, page, history);
    }
  }

  render(){
    const {match: { params }, history,
           shows, loading, page, start, end,
           error, nextShows, prevShows
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
    if (error){
      return(
        <div className='container'>
          <h1 className='error'>
            An error occurred. Try later... redirecting...
          </h1>
        </div>
      );
    }
    if (l_isEmpty(shows.results)){
      return(
        <div className='container'>
          <h1>Sorry there are any results... redirecting...</h1>
        </div>
      );
    }
    const reduced_results = shows.results.slice(start, end);
    const results = reduced_results.map(
      (film) => <Film key={film.id} film={film} history={history} type={type}/>
    );

    return(
      <div className='container'>
        <h1> Here are your results...</h1>
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
  shows, loading, error,
  control: {start, end, page }}){
  return {shows, loading, start, end, page, error};
}

export default connect(mapStateToProps, {
  fetchShows, nextShows, prevShows
})(Results);
