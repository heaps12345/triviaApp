import React from 'react';
import './Leaderboard.css';
import LeaderboardList from './LeaderboardList.js';
import Loader from 'react-loader-spinner';

const Leaderboard = ({ leaders }) => {
  return (
    <div className="leaderboardContainer">
      <h3>LEADERBOARD</h3>
      {leaders.length > 7 ? (
        <div className="leaderboardTable">
          <LeaderboardList leaders={leaders} />
        </div>
      ) : (
        <div className="loadingContainer">
          <Loader type="Oval" color="#31D5FF" height="50" width="50" />
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
