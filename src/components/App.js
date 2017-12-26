import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

import NavBar from './Navbar';
import Selector from './Selector';
import Results from './Results';
import Detail from './Detail';
import { PROJECT_NAME } from '../settings';


class App extends Component {

  render() {
    const root_url = `${PROJECT_NAME}/`;

    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path={root_url} component={Selector}/>
          <Route exact path={`${root_url}results/:type/:time`}
                 component={Results}/>
          <Route exact path={`${root_url}:type/:movie_id`}
                 component={Detail}/>
        </div>
      </Router>
    );
  }
}

export default App;
