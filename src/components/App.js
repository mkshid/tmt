import axios from 'axios';
import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import './App.css';
import NavBar from './Navbar';
import TimeSelector from './TimeSelector';
import { API_KEY as api_key, BASE_DISCOVER_URL } from '../settings';

class App extends Component {

  constructor (props){
    super(props);

    this.state = {
      times: {
        0: {text: '5-10', gte: 5, lte: 10},
        1: {text: '10-20', gte: 10, lte: 20},
        2: {text: '20-30', gte: 20, lte: 30},
        3: {text: '30-40', gte: 40, lte: 50},
        4: {text: '50-60', gte: 50, lte: 60}
      },
      selected: -1,
      data: {}
    };
  }

  handleClick(key){
    this.setState({selected: key});
    const time_selected = this.state.times[key];
    axios.get(BASE_DISCOVER_URL, {
      params: {
        api_key,
        'with_runtime.gte': time_selected.gte,
        'with_runtime.lte': time_selected.lte,
        page: 1
      }
    }).then(({data}) => {
      this.setState({data});
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <Grid className='main-container'>
          <h1 > Hey, looking for a new <u>serie</u>? </h1>
          <h3 className='first-question'>
            How many <b> minutes  </b> do you have? </h3>
          <TimeSelector
             handleClick={this.handleClick.bind(this)}
             times={this.state.times}
             />
        </Grid>
      </div>
    );
  }
}

export default App;
