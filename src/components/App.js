import axios from 'axios';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import './App.css';
import Background from '../images/bg.jpg';

import NavBar from './Navbar';
import Selector from './Selector';
import Results from './Results';


class App extends Component {

  render() {
    const BackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + Background + ')'
    };

    return (
      <Router>
        <div style={ BackgroundStyle }>
          <NavBar />
          <Route exact path='/' component={Selector}/>
          <Route exact path='/results/:time' component={Results}/>
        </div>
      </Router>
    );
  }
}

export default App;
