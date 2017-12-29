import axios from 'axios';
import { Grid } from 'react-bootstrap';
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
      page: 1
    };
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    const { match: { params }, history } = this.props;
    const { data: { results } } = this.state;
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
      this.setState({data: {
        results: results.concat(data.results)
      }});
    });
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
    const { data, start, end } = this.state;
    const {match: { params }, history } = this.props;
    const type = params.type === 'series'? 'tv' : params.type;


    if(l_isEmpty(data)){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
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
               onClick={() => history.push(`${PROJECT_NAME}/${type}/${film.id}`)}
            > More... </div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
             alt={film.title}
             />
      </div>
      );});

    return(
      <Grid className='main-container'>
        <h1> So here are your results... </h1>
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
             onClick={()=>this.next_movies()}>
            <div className='icon arrow-right' aria-hidden='true'></div>
          </span>
          <ScrollToTopButton scrollStepInPx="50" delayInMs="16.66"/>
        </div>
        <div>
        </div>
      </Grid>
    );

  }

}

export default Results;
