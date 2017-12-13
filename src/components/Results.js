import React from 'react';
import { Grid } from 'react-bootstrap';

const Results = ({data}) => {

  const results = data.results.map((film) => (
    <div className='film' key={film.id}>
      <p>{film.vote_average}/10</p>
      <p>{film.title}</p>
    </div>
  ));

  return (
    <Grid className='main-container'>
      <h1> So here are your results... </h1>
      <div className='film-container'>
        {results}
      </div>
    </Grid>
  );
};

export default Results;
