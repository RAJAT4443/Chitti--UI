import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
// import Login from './components/Login';
import Dashboard from './components/Dashboard';
import MessageHistory from './components/MessageHistory';
import CallInteraction from './components/CallInteraction';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/message-history" element={<MessageHistory />} />
        <Route path="/call-interaction" element={<CallInteraction />} />
      </Routes>
    </Router>
  );
};

export default App;
