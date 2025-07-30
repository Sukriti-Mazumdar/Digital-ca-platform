import React from 'react';
import ClientCard from 'src/component/clients/ClientCard';
import DocumentUpload from 'src/component/clients/DocumentUpload';
import 'src/component/clients/ClientDashboard.css';

const clients = [
  { id: 1, name: 'John Doe', gst: 'Active' },
  { id: 2, name: 'Jane Smith', gst: 'Pending' },
];

const ClientDashboard = () => (
  <div className="client-dashboard">
    <h2>Client Dashboard</h2>
    <div className="client-cards">
      {clients.map((c) => <ClientCard key={c.id} name={c.name} gst={c.gst} />)}
    </div>
    <DocumentUpload />
  </div>
);

export default ClientDashboard;
