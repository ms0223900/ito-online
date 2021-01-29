import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { io } from 'socket.io-client'
import { API_URI } from './constants/API';

const socket = io(API_URI)

export const SOCKET_EVENT_KEYS = {
  ADD_COUNT: 'add-count',
  ROOM_MES: 'room-mes'
};

socket.on('connect', () => {

})

socket.on('room-mes', (e: any) => {
  console.log(e)
})

const user = `User-${~~(Math.random() * 100000)}`

function App() {
  const [roomId, setRoom] = React.useState('')
  const [messages, setMessage] = React.useState<any[]>([])
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    socket.emit('chat-message', 'HI from client')
    socket.on(SOCKET_EVENT_KEYS.ROOM_MES, (e: any) => {
      console.log(e)
      setMessage(m => [...m, e])
    })
    socket.on(SOCKET_EVENT_KEYS.ADD_COUNT, (e: any) => {
      console.log(e)
      if(e) {
        (roomId === e.roomId) && setCount(e.count)
      } else {
        setCount(0)
      }
    })
    return () => {
      socket
        .off(SOCKET_EVENT_KEYS.ADD_COUNT)
        .off(SOCKET_EVENT_KEYS.ROOM_MES)
    }
  }, [roomId])

  const handleJoinRoom = (roomId='', user: string) => () => {
    socket.emit('join-room', {
      roomId,
      user,
    })
    setRoom(roomId)
  }

  const handleSendMessage = () => {
    socket.emit('chat-message', {
      roomId,
      message: 'Send Message From Room: ' + roomId,
      user,
    })
  }

  const handleAddCount = () => {
    socket.emit('add-count', {
      roomId,
      count: 1,
      user,
    })
    setCount(c => c + 1)
  }

  useEffect(() => {

  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>{'Ito Online'}</h1>
        {roomId && <h2>{`Room: ${roomId}`}</h2>}
        <button onClick={handleJoinRoom('room1', user)}>Join Room1</button>
        <button onClick={handleJoinRoom('room2', user)}>Join Room2</button>
      </header>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
        <button onClick={handleAddCount}>
          <h2>+1</h2>
        </button>
        <h2>Count: {count}</h2>
        {messages.map((m, i) => (
          <div key={i}>{JSON.stringify(m)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
