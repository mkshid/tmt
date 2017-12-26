import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import TimeSelector from './TimeSelector';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    const times = {
      0: {text: '5-10', gte: 5, lte: 10, code: '5-10'},
      1: {text: '10-20', gte: 10, lte: 20, code: '10-20'},
      2: {text: '20-30', gte: 20, lte: 30, code: '20-30'},
      3: {text: '30-40', gte: 40, lte: 50, code: '30-40'},
      4: {text: '40-50', gte: 40, lte: 50, code: '40-50'},
      5: {text: 'More', gte: 50, code: '50'}
    };

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
