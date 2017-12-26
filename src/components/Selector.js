import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import TimeSelector from './TimeSelector';

import './Selector.css';

class Selector extends Component {

  constructor(props){
    super(props);

    this.state = {
      value: '',
      componentClasses: ['time-component']
    };
  }

  handleChange(value) {

    if (value !== ''){
      let { componentClasses } = this.state;
      if (componentClasses.length === 1){
        componentClasses = componentClasses.concat(['show']);
      }
      this.setState({ value, componentClasses });
    } else {
      this.setState({ value, componentClasses: ['time-component']});
    }
  }

  handleTimeSelection(code){
    this.props.history.push(`/results/${this.state.value}/${code}`);
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
        <h1> Hey, looking for a new
          <select className='type-select'
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e.target.value)}>
            <option value='' />
            <option value='movie'>movie</option>
            <option value='series'>series</option>
          </select>
          ? </h1>
        <div className={this.state.componentClasses.join(' ')}>
        <h3 className='first-question'>
          How many <b> minutes  </b> do you have? </h3>
        <TimeSelector
           times={times}
           handleClick={this.handleTimeSelection.bind(this)}
           {...this.props}
           />
        </div>
      </Grid>
    );
  }

};

export default Selector;
