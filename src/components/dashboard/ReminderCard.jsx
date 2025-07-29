import React from 'react';
import { formatDate } from './src/utils/helpers';
import './src/components/dashboard/eminderCard.css';

const ReminderCard = ({ reminder }) => {
  return (
    <div className="reminder-card">
      <p>{reminder.text}</p>
      <small>Due: {formatDate(reminder.dueDate || new Date())}</small>
    </div>
  );
};

export default ReminderCard;
