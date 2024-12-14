import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome to Your Dashboard</h2>
      <div className="mt-4">
        <Link to="/message-history" className="btn btn-secondary">Message History</Link>
        <Link to="/call-interaction" className="btn btn-primary ms-3">Start Call Interaction</Link>
      </div>
    </div>
  );
};

export default Dashboard;
