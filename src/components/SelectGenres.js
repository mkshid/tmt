import Select from 'react-select';
import React, { Component } from 'react';
import 'react-select/dist/react-select.css';

import './SelectGenres.css';
import { GENRES } from '../consts';
import { PROJECT_NAME } from '../settings';


export default class SelectGenres extends Component {

  constructor(props){
    super(props);

    this.state = {
      genres: [],
      dropdown_opened: false
    };
  }

  componentWillMount(){
    document.body.className = 'bg second';
  }

  handleSelectClose(){
    const { match: { params: { type , time } }, history } = this.props;
    let { genres } = this.state;
    genres = genres === '-1' ? '' : genres;
    history.push(
      `${PROJECT_NAME}/results/${type}/${time}/${genres}`
    );
  }

  handleSelectChange(genres){
    this.setState({genres});
  }

  render(){
    const { match: { params: { type } }} = this.props;
    const { dropdown_opened } = this.state;
    const ph_style = {color: dropdown_opened? '#aaa': 'white'};
    const placeholder = <span style={ph_style}>Select genres you like...</span>;

    return(
      <div className='container'>
        <div className='genres-container'>
          <div className='third-question'>
            <h3> Which kind of <b> {type} </b>
              did you like last week?</h3>
            <div className='genres-selector'>
              <Select
                 onOpen={()=>this.setState({dropdown_opened: true})}
                 value={this.state.genres}
                 onChange={this.handleSelectChange.bind(this)}
                 searchable={false}
                 multi={true}
                 simpleValue
                 closeOnSelect={false}
                 valueKey='id'
                 labelKey='name'
                 options={GENRES}
                 placeholder={placeholder}
                 onClose={this.handleSelectClose.bind(this)}
                 />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
