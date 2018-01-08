import axios from 'axios';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    document.body.className = 'bg detail';
    this.getData();
  }

  getData(){
    const { match: { params: { movie_id, type } } } = this.props;
    axios.get(`${BASE_URL}/${type}/${movie_id}`, {
      params: {
        api_key
      }
    }).then(({data}) => {
      this.setState({data});
      this.getRecommendations();
    });
  }

  getRecommendations(){
    const { match: { params: { movie_id, type } } } = this.props;
    axios.get(`${BASE_URL}/${type}/${movie_id}/recommendations`, {
      params: {
        api_key
      }
    }).then(({data}) => this.setState({recommended_shows: data}));
  }


  render(){
    const { match: {params: {type} }, history } = this.props;
    const { data, recommended_shows } = this.state;

    if(l_isEmpty(data) || l_isEmpty(recommended_shows)){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
        </div>
      );
    }

    // const reduced_results = recommended_shows.results.slice(0, 8);
    // const results = reduced_results.map((film) => {
    //   return(

    //   );});

    const title = type === 'movie' ? data.title : data.name;
    const DetailComponent = type === 'movie' ?
            <FilmDetail film={data}/> : <TvDetail tv={data}/>;

    return(
      <div className='container'>
        <div className='detail-grid'>
          <span
             className='prev-movies pointer align-left'
             onClick={() => history.goBack()}>
            <div className='icon arrow-left' aria-hidden='true'></div>
          </span>
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
               alt={title} className='poster'/>
          {DetailComponent}
          <div className='results-container'>
            <ReactCSSTransitionGroup
               transitionName='film-container'
               transitionEnterTimeout={500}
               transitionLeaveTimeout={300}
               className='film-container'>

            </ReactCSSTransitionGroup>
          </div>
        <ScrollToTopButton scrollStepInPx="50" delayInMs="16.66"/>
        </div>
      </div>
    );
  }
}
