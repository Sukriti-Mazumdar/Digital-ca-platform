import React from 'react';
import StatsCard from './src/components/dashboard/StatsCard';
import ReminderCard from './src/components/dashboard/ReminderCard';
import { statsData, reminders } from './src/data/dummyData';
import './src/components/dashboard/Dashboard.css';

const Dashboard = () => (
  <div className="dashboard">
    <h2>Tax Filing Overview</h2>
    <div className="stats">
      {statsData.map((stat, i) => (
        <StatsCard key={i} title={stat.title} value={stat.value} />
      ))}
    </div>

    <h3>Compliance Reminders</h3>
    <div className="reminders">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} text={reminder.text} />
      ))}
    </div>
  </div>
);

export default Dashboard;
