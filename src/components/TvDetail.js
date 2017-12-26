import React from 'react';

const TvDetail = ({tv}) => {
  let genres = [];

  tv.genres.forEach((g) => genres.push(g.name));

  return (
    <section className='info'>
      <article> 
        <h1>{tv.name} </h1>
        <h3>{genres.join(', ')} </h3>
        <h3>Episodes: {tv.number_of_episodes}</h3>
        <h3>Seasons: {tv.number_of_seasons}</h3>
        <h3>Duration: {tv.episode_run_time.join(' ~ ')} min </h3>
        <h3>Vote: {tv.vote_average}</h3>
        <h3>Status: {tv.status}</h3>
        <h3>First Air: {tv.first_air_date}</h3>
      </article>
      <section className='overview'>
        <article>
          {tv.overview}
        </article>
      </section>
    </section>
  );
};

export default TvDetail;
