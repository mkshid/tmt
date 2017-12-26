import React from 'react';

const FilmDetail = ({film}) => {

  let genres = [];
  let productors = [];

  film.genres.forEach((g) => genres.push(g.name));
  film.production_companies.forEach((pc) => productors.push(pc.name));

  return (
    <section className='info'>
      <article> 
        <h1>{film.title} </h1>
        <h3>{film.tagline}</h3>
        <h3>{genres.join(', ')} </h3>
        <h3>{productors.join(', ')}</h3>
        <h3>Duration: {film.runtime} min </h3>
        <h3>Vote: {film.vote_average}</h3>
      </article>
      <section className='overview'>
        <article>
          {film.overview}
        </article>
      </section>
    </section>
  );
};

export default FilmDetail;
