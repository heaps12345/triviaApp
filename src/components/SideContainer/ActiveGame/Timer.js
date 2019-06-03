import React from 'react';
import { Circle } from "rc-progress";
import "rc-progress/assets/index.css";
import "./Timer.css";

const Timer = ({percent, color, timer}) => {
  const circleContainerStyle = {
    width: "184px",
    margin: "32px auto",
    position: "relative",
    top: "0px",
    left: "0px"
  };

  
  const circleStyle = {
    position: "relative",
    top: "0px"
  };

  return (
        <div style={circleContainerStyle}>
          <div style={circleStyle}>
            <Circle
              percent={percent}
              strokeWidth="4"
              strokeLinecap="round"
              strokeColor={color}
            />
          </div>
          <div className="timerStyle">
            <h2>{timer}</h2>
          </div>
        </div>
      );
    }
  

export default Timer
