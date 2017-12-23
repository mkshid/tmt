import axios from 'axios';
import './Results.css';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';
import { Grid } from 'react-bootstrap';
import { API_KEY as api_key, BASE_DISCOVER_URL } from '../settings';

class Results extends Component {

  constructor (props){
    super(props);

    this.state = {
      data: {}
    };
  }

  componentWillMount(){
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
        page: 1
      }
    }).then(({data}) => {
      this.setState({data});
    });
        
  }

  render(){
    const { data } = this.state;
    if(l_isEmpty(data)){
      return(<div> Loading data</div>);
    }
    
    const reduced_results = data.results.slice(0, 8);
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
        <div className='film-container'>
          {results}
        </div>
      </Grid>
    );

  }

}

export default Results;
