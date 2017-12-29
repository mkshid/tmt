import React, { Component } from 'react';

export default class ScrollToTopButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      intervalId: 0
    };
  }
  
  scrollStep() {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(
      this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }
  
  render () {
    return (
      <span
         className='back-to-top pointer'
         onClick={() => this.scrollToTop()}>
        <div className='icon arrow-up' aria-hidden='true'></div>
      </span>
    );
  }
} 
