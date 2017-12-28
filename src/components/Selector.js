import Select from 'react-select';
import { Grid } from 'react-bootstrap';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';
import { isEmpty as l_isEmpty } from 'lodash';

import './Selector.css';
import { GENRES } from '../consts';
import TimeSelector from './TimeSelector';
import { PROJECT_NAME } from '../settings';


class Selector extends Component {

  constructor(props){
    super(props);

    this.state = {
      value: '',
      second_question_cssClasses: ['second-question'],
      third_question_cssClasses: ['third-question'],
      genres: []
    };
  }

  handleChange(value) {

    if (value !== ''){
      let { second_question_cssClasses } = this.state;
      if (second_question_cssClasses.length === 1){
        second_question_cssClasses = second_question_cssClasses.concat(['show']);
      }
      this.setState({ value, second_question_cssClasses });
    } else {
      this.setState({ value, second_question_cssClasses: ['second-question']});
    }
  }

  handleSelectChange(genres){
    this.setState({genres});
  }

  handleSelectClose(){
    if (!l_isEmpty(this.state.genres)){
      let { third_question_cssClasses } = this.state;
      if (third_question_cssClasses.length === 1){
        third_question_cssClasses = third_question_cssClasses.concat(['show']);
      }
      this.setState({third_question_cssClasses });
    } else {
      this.setState({ third_question_cssClasses: ['third-question']});
    }
  }

  handleTimeSelection(code){
    let { value, genres } = this.state;
    genres = genres === '-1' ? '' : genres;
    this.props.history.push(
      `${PROJECT_NAME}/results/${value}/${code}/${genres}`
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

    const times = value === '' || value === 'movie'
            ? movie_times: series_times;
    return(
      <Grid className='main-container'>
        <div className='selector-grid'>
          <span className='first-question'>
            <h1> Hey, looking for a new
              <select className='type-select'
                      value={this.state.value}
                      onChange={(e) => this.handleChange(e.target.value)}>
                <option value='' />
                <option value='movie'>movie</option>
                <option value='series'>series</option>
              </select>
              ? </h1>
          </span>

          <span className={this.state.second_question_cssClasses.join(' ')}>
            <Select
               value={this.state.genres}
	       onChange={this.handleSelectChange.bind(this)}
               multi={true}
               simpleValue
               closeOnSelect={false}
               valueKey='id'
               labelKey='name'
               options={GENRES}
               placeholder='Select genres you like...'
               onClose={this.handleSelectClose.bind(this)}
               />
          </span>

          <span className={this.state.third_question_cssClasses.join(' ')}>
            <h3>
              How many <b> minutes  </b> do you have? </h3>
            <TimeSelector
               times={times}
               handleClick={this.handleTimeSelection.bind(this)}
               {...this.props}
               />
          </span>

        </div>
      </Grid>
    );
  }

};

export default Selector;
