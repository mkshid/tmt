import axios from 'axios';
import ReactLoading from 'react-loading';
import React, { Component } from 'react';
import {isEmpty as l_isEmpty} from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './Detail.css';
import Film from './Film';
import FilmDetail from './FilmDetail';
import TvDetail from './TvDetail';
import ScrollToTopButton from './ScrollToTopButton';

import { API_KEY as api_key, BASE_URL, PROJECT_NAME } from '../settings';


export default class Detail extends Component {

  constructor (props){
    super(props);
    this.state = {
      data: {},
      recommended_shows: {},
      start: 0, end: 8,
      show_id: -1,
      loading: true,
      scrollToTop: false
    };
  }

  componentWillMount(){
    document.body.className = 'bg detail';
    this.getData();
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location !== this.props.location){
      this.setState({
        show_id: nextProps.match.params.show_id,
        scrollToTop: true
      }, this.getData);

    }
  }

  getData(){
    const { match: { params: { show_id, type } } } = this.props;
    axios.get(`${BASE_URL}/${type}/${show_id}`, {
      params: {
        api_key
      }
    }).then(({data}) => {
      this.setState({data, show_id, scrollToTop: false});
      this.getRecommendations();
    });
  }

  getRecommendations(){
    const { match: { params: { show_id, type } } } = this.props;
    axios.get(`${BASE_URL}/${type}/${show_id}/recommendations`, {
      params: {
        api_key
      }
    }).then(({data}) => this.setState({
      recommended_shows: data,
      loading: false
    }));
  }

  prevShows(){
    let { start } = this.state;
    this.setState({start: start - 8, end: start});
  }

  nextShows(){
    let { end } = this.state;
    this.setState({start: end, end: end + 8});
  }

  onClickRecommended(show_id){
    const { match: {params: { type} }, history } = this.props;
    history.push(`${PROJECT_NAME}/detail/${type}/${show_id}`);
  }

  render(){
    const { match: {params: {type} }, history } = this.props;
    const { data, recommended_shows, start, end, loading } = this.state;

    if(l_isEmpty(data) || l_isEmpty(recommended_shows || loading)){
      return(
        <div>
	  <ReactLoading
             className='loader' type="spinningBubbles"
             color="white" />
        </div>
      );
    }

    const reduced_results = recommended_shows.results.slice(start, end);
    const results = reduced_results.map(
      (film) => <Film key={film.id} film={film}
      history={history} type={type}
      onClick={() => this.onClickRecommended(film.id)}/>
    );

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
          <div className='recommended-grid'>
            <h1 className='title'> You might even like these! </h1>
            <span
               className='prev-movies pointer'
               onClick={()=>this.prevShows()}
              hidden={start === 0 ? true : false }>
              <div className='icon arrow-left' aria-hidden='true'></div>
          </span>
          <span
             className='next-movies pointer'
             hidden={reduced_results.length < 8 ? true : false}
             onClick={()=>this.nextShows()}>
            <div className='icon arrow-right' aria-hidden='true'></div>
          </span>
          <ReactCSSTransitionGroup
             transitionName='recommended-shows-trans'
             transitionEnterTimeout={500}
             transitionLeaveTimeout={300}
             className='recommended-shows-container'>
            {results}
          </ReactCSSTransitionGroup>
          </div>
          <ScrollToTopButton
             scrollStepInPx="50" delayInMs="16.66"
             programmaticToTop={this.state.scrollToTop}
             />
        </div>
      </div>
    );
  }
}
