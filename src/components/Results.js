import axios from 'axios';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  isEmpty as l_isEmpty,
  isUndefined as l_isUndefined
} from 'lodash';

import './Results.css';
import ScrollToTopButton from './ScrollToTopButton';
import { PROJECT_NAME, API_KEY as api_key, BASE_URL } from '../settings';


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
    this.getData();
  }

  getData(){
    const { match: { params }, history } = this.props;

    const time = params.time.split('-');
    const type = params.type === 'series'? 'tv' : params.type;
    let gte = parseInt(time[0], 10);
    let lte = parseInt(time[1], 10);
    const genres = (l_isUndefined(params.genres) ? '' :
                    params.genres.split(',').join('|'));

    gte = !isNaN(gte) ? gte : history.push(`${PROJECT_NAME}/`);
    lte = !isNaN(lte) ? lte : '';

    axios.get(`${BASE_URL}/discover/${type}` , {
      params: {
        api_key,
        'with_runtime.gte': gte,
        'with_runtime.lte': lte,
        'with_genres': genres,
        page: this.state.page
      }
    }).then(({data}) => {
      const { start, end } = this.state;
      const results = this.state.data.results.concat(data.results);
      const reduced_results = results.slice(start, end);
      const hide_next = reduced_results.length < 8 ? true : false;

      this.setState(
        {data: { ...data, results: results},
         loading: false, hide_next
        }, this.manage_exceptions);
    }).catch(err => {
      this.setState({error: true, loading: false},
                    this.manage_exceptions);
    });
  }

  manage_exceptions(){
    const { history } = this.props;
    const { data: { results }, error } = this.state;
    if (l_isEmpty(results) || error){
      setTimeout(() => history.push(`${PROJECT_NAME}`), 3000);
    }
  }

  next_movies(){
    const {data, end, page } = this.state;
    const new_start = end;
    const new_end = end + 8;

    if (new_end > data.results.length) {
      this.setState(
        {page: page + 1, start: new_start , end: new_end},
        this.getData
      );
    } else {
      this.setState({ start: new_start, end: new_end });
    }
  }

  prev_movies(){
    const { start } = this.state;
    this.setState({ start: start - 8, end: start });
  }

  render(){
    const { data, start, end, loading, error, hide_next } = this.state;
    const {match: { params }, history } = this.props;
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
    if (l_isEmpty(data.results)){
      return(
        <div className='container'>
          <h1>Sorry there are any results... redirecting...</h1>
        </div>
      );
    }

    const reduced_results = data.results.slice(start, end);
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
        <h1> So here are your results...
          ({start === 0?start + 1:start} -
          {end > data.results.length?data.results.length: end}/
          {data.total_results})</h1>
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
             onClick={()=>this.prev_movies()}
            hidden={start === 0 ? true : false }>
            <div className='icon arrow-left' aria-hidden='true'></div>
          </span>
          <span
             className='next-movies pointer'
             hidden={hide_next}
             onClick={()=>this.next_movies()}>
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

export default Results;
