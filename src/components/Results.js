import './Results.css';
import React from 'react';
import { Grid } from 'react-bootstrap';

const Results = ({data}) => {

  const reduced_results = data.results.slice(0, 8);
  const results = reduced_results.map((film) => (
    <div className='film' key={film.id}>
      <div className='info'>
        <div className='vote'>{film.vote_average}/10</div>
        <div className='title'>{film.title}</div>
      </div>
      <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}/>
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
