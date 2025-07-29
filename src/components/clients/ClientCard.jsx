import React from 'react';
import './src/component/clients/ClientCard.css';

const ClientCard = ({ name, gst }) => (
  <div className="client-card">
    <h4>{name}</h4>
    <p>GST Status: {gst}</p>
  </div>
);

export default ClientCard;
