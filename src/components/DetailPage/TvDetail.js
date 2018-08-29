import React from 'react';

const TvDetail = ({tv}) => {
  let genres = [];
  let networks = [];

  tv.genres.forEach((g) => genres.push(g.name));
  tv.networks.forEach((n) => networks.push(n.name));

  return (
    <section className='info'>
      <article className='title'>
        <h1>{tv.name} </h1>
      </article>
      <article>
        <h4>{genres.join(', ').toUpperCase()}</h4>
        <h4>Episodes: {tv.number_of_episodes}</h4>
        <h4>Seasons: {tv.number_of_seasons}</h4>
        <h4>Duration: {tv.episode_run_time.join(' ~ ')} min </h4>
        <h4>Vote: {tv.vote_average}</h4>
        <h4>Status: {tv.status}</h4>
        <h4>First Air: {tv.first_air_date}</h4>
        <h4>Network{networks.length > 1? 's' : '' }: {networks.join(', ')} </h4>
      </article>
      <article className='links'>
        <a href={tv.homepage} target='_blank'>{tv.homepage? 'Homepage': ''}</a>
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
