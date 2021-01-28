import React from 'react';
import logo from './logo.svg';
import './App.css';

import { io } from 'socket.io-client'
import { API_URI } from './constants/API';

const socket = io(API_URI)

export type SocketEventKeys = 'chat-message' | ''

socket.on('connect', () => {

})

socket.on('room-mes', (e: any) => {
  console.log(e)
})

function App() {
  const [roomId, setRoom] = React.useState('')
  const [messages, setMessage] = React.useState<any[]>([])

  React.useEffect(() => {
    socket.emit('chat-message', 'HI from client')
    socket.on('room-mes', (e: any) => {
      console.log(e)
      setMessage(m => [...m, e])
    })
  }, [])

  const handleJoinRoom = (roomId='') => () => {
    socket.emit('join-room', {
      roomId,
    })
    setRoom(roomId)
  }

  const handleSendMessage = () => {
    socket.emit('chat-message', {
      message: 'Send Message From Room: ' + roomId
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{'Ito Online'}</h1>
        {roomId && <h2>{`Room: ${roomId}`}</h2>}
        <button onClick={handleJoinRoom('room1')}>Join Room1</button>
        <button onClick={handleJoinRoom('room2')}>Join Room2</button>
      </header>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
        {messages.map((m, i) => (
          <div key={i}>{JSON.stringify(m)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
