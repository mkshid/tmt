import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import NavBar from './Navbar';
import Selector from './Selector';
import Results from './Results';
import {isEmpty as l_isEmpty} from 'lodash';
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
        4: {text: 'More', gte: 50}
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
    let component_to_view = (
      <Selector
         times={this.state.times}
         handleClick={this.handleClick.bind(this)}
         />
    );

    if (!l_isEmpty(this.state.data)){
      component_to_view = <Results />;
    }

    return (
      <div>
        <NavBar />
        {component_to_view}
      </div>
    );
  }
}

export default App;
