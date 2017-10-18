import React, { Component } from  'react';


class TimeSelector extends Component {

  render(){
    const time_list = [
      '5-10', '10-20', '20-30',
      '30-40', '40-50', '50-60'
    ];
    const time_selectors = time_list.map(
      (t) => <div className='sqr'> <p>{t}</p> </div>
    );
    return (
      <div className='time-selector'>
        <p> Give a time per day... </p>
        <div className='timers-container'>
          {time_selectors}
        </div>
      </div>
    );
    
  }
}

export default TimeSelector;
