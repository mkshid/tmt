import axios from 'axios';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Results.css';
import { API_KEY as api_key, BASE_DISCOVER_URL } from '../settings';


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
    let gte = parseInt(time[0], 10);
    let lte = parseInt(time[1], 10);

    gte = !isNaN(gte) ? gte : history.push('/');
    lte = !isNaN(lte) ? lte : '';

    axios.get(BASE_DISCOVER_URL, {
      params: {
        api_key,
        'with_runtime.gte': gte,
        'with_runtime.lte': lte,
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
    const results = reduced_results.map((film) => (
      <div className='film' key={film.id}>
        <div className='info'>
          <div className='vote'>{film.vote_average}/10</div>
          <div className='title'>{film.title}</div>
        </div>
        <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
             alt={film.title}
             />
      </div>
    ));

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
            <i>⬅</i>
          </span>
          <span
             className='next-movies pointer'
             onClick={()=>this.next_movies()}>
            <i>➡</i>
          </span>
        </div>
        <div>
        </div>
      </Grid>
    );

  }

}

export default Results;
