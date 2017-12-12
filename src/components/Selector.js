import React from 'react';
import { Grid } from 'react-bootstrap';
import TimeSelector from './TimeSelector';

const Selector = ({handleClick, times}) => {

  return(
    <Grid className='main-container'>
      <h1 > Hey, looking for a new <u>serie</u>? </h1>
      <h3 className='first-question'>
        How many <b> minutes  </b> do you have? </h3>
      <TimeSelector
         handleClick={handleClick.bind(this)}
         times={times}
         />
    </Grid>
  );

};

export default Selector;
