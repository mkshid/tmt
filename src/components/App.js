import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import Background from '../images/bg.jpg';

import NavBar from './Navbar';
import Selector from './Selector';
import Results from './Results';
import Detail from './Detail';


class App extends Component {

  render() {
    const BackgroundStyle = {
      width: '100%',
      height: '100%',
      backgroundImage: 'url(' + Background + ')'
    };

    return (
      <Router>
        <div style={ BackgroundStyle } className='main-div'>
          <NavBar />
          <Route exact path='/' component={Selector}/>
          <Route exact path='/results/:time' component={Results}/>
          <Route exact path='/movie/:movie_id' component={Detail}/>
        </div>
      </Router>
    );
  }
}

export default App;
