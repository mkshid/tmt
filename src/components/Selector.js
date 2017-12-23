import React from 'react';
import { Grid } from 'react-bootstrap';
import TimeSelector from './TimeSelector';

const Selector = (props) => {

  const times = {
    0: {text: '5-10', gte: 5, lte: 10, code: '5-10'},
    1: {text: '10-20', gte: 10, lte: 20, code: '10-20'},
    2: {text: '20-30', gte: 20, lte: 30, code: '20-30'},
    3: {text: '30-40', gte: 40, lte: 50, code: '30-40'},
    4: {text: '40-50', gte: 40, lte: 50, code: '40-50'},
    5: {text: 'More', gte: 50, code: '50'}
  };

  return(
    <Grid className='main-container'>
      <h1 > Hey, looking for a new <u>series</u>? </h1>
      <h3 className='first-question'>
        How many <b> minutes  </b> do you have? </h3>
      <TimeSelector
         times={times}
         {...props}
         />
    </Grid>
  );

};

export default Selector;
