import React from 'react';
import imdb_logo from '../../images/icons/imdb_logo.svg';

const FilmDetail = ({film}) => {

  let genres = [];

  film.genres.forEach((g) => genres.push(g.name));

  return (
    <section className='info'>
      <article className='title'>
        <h1>{film.title} </h1>
        <p>{film.tagline}</p>
      </article>
      <article>
        <h4>{genres.join(', ').toUpperCase()} </h4>
        <h4>Duration: {film.runtime} min </h4>
        <h4>Vote: {film.vote_average}</h4>
      </article>
      <article className='links'>
        <a href={`http://www.imdb.com/title/${film.imdb_id}/`} target='_blank'>
          <img src={imdb_logo} className='imdb-logo pointer'
               alt='imdb link'/>
        </a>
        <a href={film.homepage} target='_blank'>{film.homepage? 'Hompage': ''}</a>
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
