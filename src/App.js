import React, { Component } from 'react';
import './App.css';
import Question from './components/Question/Question';
import Countdown from './components/Countdown/Countdown';
import Summary from './components/Summary/Summary';
import Leaderboard from './components/SideContainer/Leaderboard/Leaderboard';
import SideContainer from './components/SideContainer/ActiveGame/ActiveGame';

class App extends Component {
  state = {
    timer: 20,
    choice1: '',
    choice2: '',
    choice3: '',
    choice4: '',
    score: 0,
    color: '#00E7D0',
    percent: 0,
    gameStatus: 'notStarted',
    correctAnswer: '',
    question: '',
    questionCount: 0,
    leaders: [],
    questionDb: {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correctAnswer: '',
      totalCorrectAnswers: '',
      id: ''
    }
    //  leaders: 0
  };

  componentDidMount() {
    fetch('https://trivia-app-123.herokuapp.com/leaderboard')
      .then(res => res.json())
      .then(leaders => this.setState({ leaders }))
      .catch(err => console.log('unable to connect to server'));
  }

  handleGameStatusChange = value => {
    if (value === 'countdown') {
      this.fetchQuestions();
    }
    this.setState({ gameStatus: value });
  };

  gameStart = () => {
    this.setState({ questionCount: 0 });
    this.setState({ score: 0 });
    this.loadQuestion();
    this.handleGameStatusChange('ongoing');
  };

  restartTimer = () => {
    this.stopTimer();
    this.startTimer();
  };

  startTimer = () => {
    this.setState({ timer: 20 });
    this.updatePercent();
    this.timer = setInterval(
      () => this.countdown(),
      // this.setState({
      //   timer: this.state.timer - 1
      // }),
      1000
    );

    // this.interval = setInterval(e => this.countDown(), 1000);
  };

  countdown = () => {
    if (this.state.timer > 0) {
      this.setState({
        timer: this.state.timer - 1
      });
      this.updatePercent();
    } else if (this.state.timer === 0) {
      this.loadQuestion();
      this.restartTimer();
    }
  };

  updateScore = () => {
    this.setState({ score: this.state.score + 1 });
  };

  updatePercent = () => {
    if (this.state.timer < 4) {
      this.setState({ color: '#FF487D' });
    } else if (this.state.timer < 8) {
      this.setState({ color: '#FAEF00' });
    } else {
      this.setState({ color: '#00E7D0' });
    }
    let x = this.state.timer * 5;
    this.setState({ percent: x });
  };
  stopTimer = () => {
    clearInterval(this.timer);
  };

  updateLeaderboard = newTableData => {
    debugger;
    this.setState({ leaders: newTableData });
    this.endGame();
  };

  loadQuestion = () => {
    this.restartTimer();
    let i = this.state.questionCount;
    if (this.state.questionCount === 10) {
      this.stopTimer();
      this.handleGameStatusChange('summary');
      return;
    }
    for (i; i < 10; ) {
      this.setState({ question: this.state.questionDb[i].question });
      this.setState({ correctAnswer: this.state.questionDb[i].correctAnswer });
      this.setState({ questionCount: this.state.questionCount + 1 });
      this.setState({ choice1: this.state.questionDb[i].allAnswers[0] });
      this.setState({ choice2: this.state.questionDb[i].allAnswers[1] });
      this.setState({ choice3: this.state.questionDb[i].allAnswers[2] });
      this.setState({ choice4: this.state.questionDb[i].allAnswers[3] });
      return;
      // console.log(this.state.correctAnswer);
    }
  };

  fetchQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986') // using Open Triva API to grab different questions.
      .then(res => res.json())
      .then(data => {
        this.setState({
          questionDb: data.results.map((item, index) => ({
            category: item.category,
            question: item.question,
            correctAnswer: item.correct_answer,
            allAnswers: item.incorrect_answers.concat(item.correct_answer)
          }))
        });
      })
      .then(() => {
        // shuffling the questions for each answer to prevent the correct answer from being in the same place.
        this.setState({
          questionDb: this.state.questionDb.map(item => {
            item.allAnswers = this.shuffleQuestions(item.allAnswers);
            return item;
          })
        });
      });

    //this.state.questionDb.allAnswers.sort(() => .5 - Math.random());
    setTimeout(() => {
      this.loadQuestion();
    }, 5000);
  };

  shuffleQuestions = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  endGame = () => {
    this.handleGameStatusChange('notStarted');
    this.setState({ questionCount: 0 });
    this.setState({ points: 0 });
  };

  render() {
    let {
      question,
      timer,
      color,
      percent,
      score,
      correctAnswer,
      choice1,
      choice2,
      choice3,
      choice4,
      questionCount,
      leaders
    } = this.state;
    return (
      <div className="grid-container">
        <div className="main-container">
          {this.state.gameStatus === 'notStarted' ? (
            <div className="start-content">
              <h1>Trivia Challenge</h1>
              <h2>Can you make it on the leaderboard?</h2>
              <input
                type="button"
                value="Start"
                className="standard-button"
                onClick={() => this.handleGameStatusChange('countdown')}
              />
            </div>
          ) : this.state.gameStatus === 'countdown' ? (
            <Countdown gameStart={this.gameStart} />
          ) : this.state.gameStatus === 'ongoing' ? (
            <Question
              question={question}
              choice1={choice1}
              choice2={choice2}
              choice3={choice3}
              choice4={choice4}
              questionCount={questionCount}
              loadQuestion={this.loadQuestion}
              correctAnswer={correctAnswer}
              stopTimer={this.stopTimer}
              updateScore={this.updateScore}
            />
          ) : (
            <div className="summary-content">
              <Summary
                endGame={this.endGame}
                updateLeaderboard={this.updateLeaderboard}
                score={score}
                handleGameStatusChange={this.handleGameStatusChange}
                leaders={leaders}
              />
            </div>
          )}
        </div>
        <div className="side-container">
          {this.state.gameStatus === 'ongoing' ? (
            <SideContainer endGame={this.endGame} color={color} percent={percent} timer={timer} score={score} />
          ) : (
            <Leaderboard leaders={leaders} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
