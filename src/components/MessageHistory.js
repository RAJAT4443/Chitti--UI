import React, { useEffect, useState } from 'react';

const MessageHistory = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the backend API
    setMessages([
      { id: 1, caller: 'John', summary: 'Need help with a project', timestamp: '2024-12-14' },
      { id: 2, caller: 'Alice', summary: 'Urgent meeting tomorrow', timestamp: '2024-12-13' },
    ]);
  }, []);

  return (
    <div className="container mt-5">
      <h2>Message History</h2>
      <ul className="list-group mt-4">
        {messages.map((msg) => (
          <li key={msg.id} className="list-group-item">
            <strong>Caller:</strong> {msg.caller} <br />
            <strong>Summary:</strong> {msg.summary} <br />
            <small><strong>Date:</strong> {msg.timestamp}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageHistory;
