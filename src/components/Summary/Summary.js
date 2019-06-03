import React, { Component } from 'react';
import './Summary.css';

export default class Summary extends Component {
  state = {
    localRoute: 'score',
    rank: 0,
    name: ''
  };

  componentDidMount() {
    debugger;
    //Compares the rank list with the users current score. Rank is increased if they have higher points.
    this.setState({ localRoute: 'score' });
    let rankTemp = 1;
    for (let i = 0; i <= 7; i++) {
      if (this.props.score < this.props.leaders[i].score) {
        rankTemp = rankTemp + 1;
      }
    }
    this.setState({ rank: rankTemp });
  }

  onSubmit = () => {
    if (this.state.name === '') {
      return;
    } else {
      this.updateTable();
    }
  };

  updateTable = () => {
    // Update leaderboard database and update the leaderboard table.
    fetch('https://trivia-app-123.herokuapp.com/leaderboard', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        score: this.props.score
      })
    })
      .then(response => response.json())
      .then(newTableData => {
        this.props.updateLeaderboard(newTableData);
      })
      .catch(() => {
        console.log('something went wrong');
      });
  };

  localRouteChange = () => {
    // If user has a rank of 8 or higher, they will be directed to the enter their leaderboard name.
    if (this.state.rank < 9) {
      this.setState({ localRoute: 'leaderboard' });
    } else {
      this.props.endGame();
    }
  };
  onNameChange = e => {
    // Ignore certain types of user input when entering leaderboard name.
    this.setState({ name: e.target.value.replace(/[^a-zA-Z0-9]/gi, '') });
  };
  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  };
  render() {
    return (
      <div className="summary-content">
        {this.state.localRoute === 'score' ? (
          <div>
            <h2>Your final score is:</h2>
            <h1> {this.props.score}</h1>
            <input
              type="button"
              className="standard-button points-button"
              value="Next"
              onClick={() => this.localRouteChange()}
            />
          </div>
        ) : (
          <div className="leaderboard-confirm">
            <h1>You made it on the leaderboard!</h1>
            <h2>Enter your leaderboard name:</h2>
            <input
              type="text"
              name="username"
              className="name-entry"
              value={this.state.name}
              maxLength="20"
              onChange={this.onNameChange}
              autoFocus={true}
              onKeyDown={this.onKeyDown}
            />
            <input type="button" className="standard-button" onClick={this.onSubmit} value="Next" />
          </div>
        )}
      </div>
    );
  }
}
