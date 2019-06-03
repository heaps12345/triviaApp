import React from 'react';
import LeaderboardListItem from './LeaderboardListItem';

const LeaderboardList = ({ leaders }) => {
  return (
    <div>
      <LeaderboardListItem leaders={leaders} />
      {leaders.slice(0, 8).map((user, i) => {
        // Grab the top 8 ranks of the leaders and display in table.
        return <LeaderboardListItem key={i} rank={i + 1} name={user.name} score={user.score} />;
      })}
    </div>
  );
};

export default LeaderboardList;
