import React, { Component } from 'react';
import './AnswerButton.css';

export default class AnswerButton extends Component {
  state = {
    correct: false,
    incorrect: false
  };

  answerQuestion = () => {
    this.props.changeButtonStatus('disabled');
    if (this.props.choice === this.props.correctAnswer) {
      this.setState({ correct: true });
      this.props.updateScore();
    } else {
      this.setState({ incorrect: true });
    }
    this.props.stopTimer();
    setTimeout(() => {
      this.props.changeButtonStatus('enabled');
      this.setState({ correct: false });
      this.setState({ incorrect: false });
      this.props.loadQuestion();
    }, 2000);
  };
  render() {
    let btn_class1 = this.state.correct ? 'correctAnswer' : 'none';
    let btn_class2 = this.state.incorrect ? 'incorrectAnswer' : 'none';

    return (
      <input
        type="button"
        disabled={this.props.buttonDisabled}
        onClick={this.answerQuestion}
        value={decodeURIComponent(this.props.choice)}
        className={` btn-answer  ${btn_class1} ${btn_class2} `}
      />
    );
  }
}
