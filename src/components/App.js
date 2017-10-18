import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import './App.css';
import NavBar from './Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Grid className='main-container'>
          <h1 > Hey, looking for a new <u>serie</u>? </h1>
          <h3 className='first-question'>
            How many <b> minutes  </b> do you have? </h3>
        </Grid>
      </div>
    );
  }
}

export default App;
