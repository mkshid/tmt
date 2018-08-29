import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom';


import './App.css';

import NavBar from './Navbar';
import Selector from './Homepage/Selector';
import SelectGenres from './GeneresSelector/SelectGenres';
import Results from './ResultsPage/Results';
import Detail from './Detail';
import About from './About';

import { PROJECT_NAME } from '../settings';


class App extends Component {

  render() {
    const root_url = `${PROJECT_NAME}/`;

    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path={`${root_url}detail/:type/:show_id`}
                   component={Detail}/>
            <Route path={`${root_url}results/:type/:time/:genres?`}
                   component={Results}/>
            <Route exact path={`${root_url}:type/:time`}
                   component={SelectGenres}/>
            <Route path={`${root_url}about`}
                   component={About} />
            <Route exact path={root_url} component={Selector}/>
            <Redirect to={root_url}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
