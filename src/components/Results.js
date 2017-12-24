import axios from 'axios';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';

import './Results.css';
import { API_KEY as api_key, BASE_DISCOVER_URL } from '../settings';


class Results extends Component {

  constructor (props){
    super(props);

    this.state = {
      data: {},
      start: 0, end: 8,
      last_start: 0, last_end: 8,
      page: 1
    };
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    const { match: { params }, history } = this.props;
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
      this.setState({data});
    });
  }


  next_movies(){
    const {data, start, end, page } = this.state;
    const new_start = end;
    const new_end = end + 8;

    if (new_start > data.results.length) {
      this.setState(
        {page: page + 1, start: 0 , end: 8,
         last_start: start, last_end: end},
        this.getData
      );
    } else {
      this.setState({
        start: new_start, end: new_end,
        last_start: start, last_end: end
      });
    }
  }

  prev_movies(){
    const {start, last_start, end, page } = this.state;
    if (start === 0 && page !== 1){
      // This is needed necessary to go back to the previous set
      // in the right place.
      this.setState(
        {page: page - 1, start: 16, end: 24,
         last_start: last_start - 8, lats_end: last_start},
        this.getData
      );
    } else {
      this.setState({
        start: start - 8, end: start,
        last_start: start, last_end: end
      });
    }
  }

  render(){
    const { data, start, end, page } = this.state;

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
          <div className='film-container'>
            {results}
          </div>
          <span
             className='prev-movies pointer'
             onClick={()=>this.prev_movies()}
            hidden={start === 0 && page === 1 ? true : false }>
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
