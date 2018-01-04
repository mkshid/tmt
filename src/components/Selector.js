import { connect } from 'react-redux';
import React, { Component } from 'react';

import './Selector.css';
import TimeSelector from './TimeSelector';
import { PROJECT_NAME } from '../settings';
import { resetState } from '../actions';


class Selector extends Component {

  constructor(props){
    super(props);

    this.state = {
      value: '',
      code: '',
      first_question_cssClasses: ['first-question'],
      second_question_cssClasses: ['second-question']
    };
  }
  componentWillMount(){
    document.body.className = 'bg first';
    this.props.resetState();
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

    const times = value === '' || value === 'movie'
            ? movie_times: series_times;

    const isFirefox = typeof InstallTrigger !== 'undefined';
    const options_cName = isFirefox? '' : 'select-type-option';
    return(
      <div className='container'>
        <div className='selector-container'>
          <section className={this.state.first_question_cssClasses.join(' ')}>
            <h1> Hey, looking for a new
              <select className='type-select'
                      value={this.state.value}
                      onChange={(e) => this.handleChange(e.target.value)}>
                <option className={options_cName} value='' />
                <option className={options_cName}
                        value='movie'>movie</option>
                <option className={options_cName}
                        value='series'>series</option>
              </select>
              ? </h1>
          </section>

          <section className={this.state.second_question_cssClasses.join(' ')}>
            <h3>How many <b> minutes  </b> do you have? </h3>
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

