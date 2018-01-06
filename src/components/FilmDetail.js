import React from 'react';
import imdb_logo from '../images/icons/imdb_logo.svg';

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
        <h3><a href={film.homepage} target='_blank'>{film.homepage}</a></h3>
        <a href={`http://www.imdb.com/title/${film.imdb_id}/`} target='_blank'>
          <img src={imdb_logo} className='imdb-logo pointer'
               alt='imdb link'/>
        </a>
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
