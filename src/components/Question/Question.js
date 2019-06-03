import React, { Component } from 'react';
import AnswerButton from '../AnswerButton/AnswerButton';

import './Question.css';

export default class Question extends Component {
  state = {
    buttonDisabled: false
  };

  changeButtonStatus = value => {
    if (value === 'disabled') {
      this.setState({ buttonDisabled: true });
    } else {
      this.setState({ buttonDisabled: false });
    }
  };
  render() {
    return (
      <div className="question-content">
        <div className="question-header">
          <h4>QUESTION: {this.props.questionCount} OF 10 </h4>
        </div>
        <div className="question-container">
          <h2>{decodeURIComponent(this.props.question)}</h2>
        </div>
        <div className="answer-container">
          <AnswerButton
            stopTimer={this.props.stopTimer}
            pointMultiplier={this.props.pointMultiplier}
            updatePoints={this.props.updatePoints}
            changeButtonStatus={this.changeButtonStatus}
            buttonDisabled={this.state.buttonDisabled}
            choice={this.props.choice1}
            loadQuestion={this.props.loadQuestion}
            correctAnswer={this.props.correctAnswer}
            updateScore={this.props.updateScore}
          />
          <AnswerButton
            stopTimer={this.props.stopTimer}
            pointMultiplier={this.props.pointMultiplier}
            updatePoints={this.props.updatePoints}
            changeButtonStatus={this.changeButtonStatus}
            buttonDisabled={this.state.buttonDisabled}
            choice={this.props.choice2}
            loadQuestion={this.props.loadQuestion}
            correctAnswer={this.props.correctAnswer}
            updateScore={this.props.updateScore}
          />
          <AnswerButton
            stopTimer={this.props.stopTimer}
            pointMultiplier={this.props.pointMultiplier}
            updatePoints={this.props.updatePoints}
            changeButtonStatus={this.changeButtonStatus}
             buttonDisabled={this.state.buttonDisabled}
            choice={this.props.choice3}
            loadQuestion={this.props.loadQuestion}
            correctAnswer={this.props.correctAnswer}
            updateScore={this.props.updateScore}
          />
          <AnswerButton
            stopTimer={this.props.stopTimer}
            pointMultiplier={this.props.pointMultiplier}
            updatePoints={this.props.updatePoints}
            changeButtonStatus={this.changeButtonStatus}
             buttonDisabled={this.state.buttonDisabled}
            choice={this.props.choice4}
            loadQuestion={this.props.loadQuestion}
            correctAnswer={this.props.correctAnswer}
            updateScore={this.props.updateScore}
          />
        </div>
      </div>
    );
  }
}
