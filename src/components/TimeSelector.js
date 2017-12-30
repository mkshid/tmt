import './TimeSelector.css';
import React from  'react';
import {map as l_map} from 'lodash';

const TimeSelector = ({times, handleClick}) => {

  const time_selectors = l_map(
    times, (v, k) => (
      <div className='time' key={k} onClick={(e) => {
          handleClick(v.code);
        }}>
        <p>{v.text}</p>
      </div>
    ));

  return (
      <div className='time-selector'>
        <p className='title'> Give a time per day... </p>
        <div className='timers-container'>
          {time_selectors}
        </div>
      </div>
  );
};

export default TimeSelector;
