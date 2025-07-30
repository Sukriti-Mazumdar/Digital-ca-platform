import React from 'react';
import 'src/components/dashboard/StatsCard.css';

const StatsCard = ({ title, value }) => (
  <div className="stats-card">
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
);

export default StatsCard;
