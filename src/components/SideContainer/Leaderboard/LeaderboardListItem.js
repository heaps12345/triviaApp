import React from 'react';

const LeaderboardListItem = ({ rank, name, score }) => {
  return (
    <div className="entryStyling">
      <h3>{rank}</h3>
      <h3>{name}</h3>
      <h3>{score}</h3>
    </div>
  );
};

export default LeaderboardListItem;
