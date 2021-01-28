import React from 'react';
import logo from './logo.svg';
import './App.css';

import { io } from 'socket.io-client'
import { API_URI } from './constants/API';

const socket = io(API_URI)

function App() {

  React.useEffect(() => {
    socket.emit('chat-message', 'HI from client')
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>{'Ito Online'}</h1>
      </header>
    </div>
  );
}

export default App;
