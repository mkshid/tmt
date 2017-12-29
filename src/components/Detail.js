import axios from 'axios';
import { Grid } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';

import './Detail.css';
import FilmDetail from './FilmDetail';
import TvDetail from './TvDetail';
import ScrollToTopButton from './ScrollToTopButton';

import { API_KEY as api_key, BASE_URL } from '../settings';


export default class Detail extends Component {

  constructor (props){
    super(props);
    this.state = {
      data: {}
    };
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    const { match: { params: { movie_id, type } } } = this.props;
    axios.get(`${BASE_URL}/${type}/${movie_id}`, {
      params: {
        api_key
      }
    }).then(({data}) => this.setState({data}));
  }

  render(){
    const { match: {params: {type} }, history } = this.props;
    const { data } = this.state;

    if(l_isEmpty(data)){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
        </div>
      );
    }
    const title = type === 'movie' ? data.title : data.name;
    const DetailComponent = type === 'movie' ?
            <FilmDetail film={data} /> : <TvDetail tv={data}/>;

    return(
      <Grid className='main-container'>
        <div className='detail-grid'>
          <span
             className='prev-movies pointer align-left'
             onClick={() => history.goBack()}>
            <div className='icon arrow-left' aria-hidden='true'></div>
          </span>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
               alt={title} />
          {DetailComponent}
          <ScrollToTopButton scrollStepInPx="50" delayInMs="16.66"/>
        </div>
      </Grid>
    );
  }
}
