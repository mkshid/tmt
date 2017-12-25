import _ from 'lodash';
import axios from 'axios';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';

import './Detail.css';
import { API_KEY as api_key, BASE_URL } from '../settings';

export default class Detail extends Component {

  constructor (props){
    super(props);
    this.state = {
      film: {}
    };
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    const { match: { params: { movie_id } } } = this.props;

    axios.get(`${BASE_URL}/movie/${movie_id}`, {
      params: {
        api_key
      }
    }).then(({data}) => this.setState({film: data}));
  }

  render(){
    const { history } = this.props;
    const { film } = this.state;

    if(_.isEmpty(film)){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
        </div>
      );
    }

    let genres = [];
    let productors = [];

    film.genres.forEach((g) => genres.push(g.name));
    film.production_companies.forEach((pc) => productors.push(pc.name));

    return(
      <Grid className='main-container'>
        <div className='detail-grid'>
          <span
             className='prev-movies pointer align-left'
             onClick={() => history.goBack()}>
             <i>⬅</i>
          </span>
          <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
               alt={film.title} />
          <section className='info'>
            <article> 
              <h1>{film.title} </h1>
              <h3>{film.tagline}</h3>
              <h3>{genres.join(', ')} </h3>
              <h3>{productors.join(', ')}</h3>
              <h3>Duration: {film.runtime} min </h3>
              <h3>Vote: {film.vote_average}</h3>
            </article>
            <section className='overview'>
              <article>
                {film.overview}
              </article>
            </section>
          </section>
        </div>
      </Grid>
    );
  }
}
