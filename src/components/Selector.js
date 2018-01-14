import { connect } from 'react-redux';
import React, { Component } from 'react';

import './Selector.css';
import TimeSelector from './TimeSelector';
import { PROJECT_NAME } from '../settings';
import { resetState } from '../actions';


class Selector extends Component {

  constructor(props){
    super(props);

    this.state = { value: '', code: ''};
  }

  componentWillMount(){
    document.body.className = 'bg first';
    this.props.resetState();
  }

  handleChange(value) {
      this.setState({ value });
  }

  handleTimeSelection(code){
    this.props.history.push(
      `${PROJECT_NAME}/${this.state.value}/${code}`
    );
  }

  render(){
    const { value } = this.state;
    const series_times =  {
      0: {text: '5-10', code: '5-10'},
      1: {text: '10-20', code: '10-20'},
      2: {text: '20-30', code: '20-30'},
      3: {text: '30-40', code: '30-40'},
      4: {text: '40-50', code: '40-50'},
      5: {text: 'More', code: '50'}
    };

    const movie_times = {
      0: {text: '5-30', code: '5-30'},
      1: {text: '30-60', code: '30-60'},
      2: {text: '60-90', code: '60-90'},
      3: {text: '90-120', code: '90-120'},
      4: {text: '120-150', code: '120-150'},
      5: {text: 'More', code: '150'}
    };

    const times = value === '' || value === 'movie' ? movie_times: series_times;
    const type_select_css = 'type-select';
    const type_select_selected_css = 'type-select selected';
    const seriesClassName = value === 'series'? type_select_selected_css : type_select_css;
    const movieClassName = value === 'movie'? type_select_selected_css : type_select_css;
    const secondquestClassName = value !== ''? 'second-question show': 'second-question';

    return(
      <div className='container'>
        <div className='selector-container'>
          <section className='first-question'>
            <h3> Hey, what are you looking for ? </h3>
            <div className='type-container'>
              <button
                 className={seriesClassName}
                 onClick={(e) => this.handleChange('series')}>
                <p>Series</p>
              </button>
              <button className={movieClassName}
                   onClick={(e) => this.handleChange('movie')}>
                <p>Movies</p>
              </button>
            </div>
          </section>
          <section className={secondquestClassName}>
            <h3>How many minutes do you want to spend on it?</h3>
            <TimeSelector
               times={times}
               handleClick={this.handleTimeSelection.bind(this)}
               {...this.props}
               />
          </section>
        </div>
      </div>
    );
  }

};

export default connect(null, {
  resetState
})(Selector);

