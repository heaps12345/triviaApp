import React from 'react';
import './ActiveGame.css';
import Timer from './Timer'

const ActiveGame = ({ score, timer, endGame, color, percent }) => {
  return (
    <div className="side-container-content">
      <div className="point-container">
        <h3>SCORE</h3>
        <h2>{score}</h2>
      </div>
      <div className="timer-container">
        <h3>TIMER</h3>
         <Timer color={color} percent={percent} timer={timer} />
      </div>
      <div className="button-container">
        <input type="button" className="standard-button exit-button" value="End Game" onClick={endGame} />
      </div>
    </div>
  );
};

export default ActiveGame;
