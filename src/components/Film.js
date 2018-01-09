import React from 'react';

import './Film.css';
import { PROJECT_NAME } from '../settings';

const Film = ({ film, history, type, onClick }) => {
  if (onClick === undefined){
    onClick = () => history.push(
      `${PROJECT_NAME}/detail/${type}/${film.id}`);
  }
  const title = film.hasOwnProperty('title') ? film.title : film.name;
  return (
    <div className='film'>
      <div className='info'>
        <div className='vote'>{film.vote_average}/10</div>
        <div className='title'>{title}</div>
        <div className='more'
             onClick={onClick}
          > More... </div>
      </div>
      <img src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
           alt={film.title}
           />
    </div>

  );
};

export default Film;
