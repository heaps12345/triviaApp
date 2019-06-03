import React, { Component } from 'react';
import './Countdown.css';

export default class Countdown extends Component {
  state = {
    countdownTimer: 5
  };

  componentDidMount() {
    this.startingInterval = setInterval(e => this.startGameTimer(), 1000);
  }

  startGameTimer = () => {
    if (this.state.countdownTimer > 0) {
      this.setState({ countdownTimer: this.state.countdownTimer - 1 });
    } else if (this.state.countdownTimer === 0) {
      clearInterval(this.startingInterval);
      this.setState({ countdownTimer: 20 });
      this.props.gameStart();
    }
  };
  render() {
    return (
      <div className="countdown-content">
        <h2>Game will start in:</h2>
        <h1>{this.state.countdownTimer}</h1>
      </div>
    );
  }
}
