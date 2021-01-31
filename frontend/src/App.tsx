import React, { useCallback, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { io } from 'socket.io-client';
import { API_URI } from './constants/API';
import useQueryRooms from './api/custom-hooks/useQueryRooms';

const socket = io(API_URI);

export const SOCKET_EVENT = {
  ADD_COUNT: 'ADD_COUNT',
  JOIN_ROOM: 'JOIN_ROOM',
  ROOM_MES: 'ROOM_MES',
  GAME_STATUS: 'GAME_STATUS',
  USER_ACTION: 'USER_ACTION',
  CHAT: 'CHAT',
};
export const USER_ACTION = {
  PLAY_CARD: 'PLAY_CARD',
  SET_READY: 'SET_READY',
};

socket.on('room-mes', (e: any) => {
  console.log(e);
});

const userId = ~~(Math.random() * 100000);
const user = {
  id: String(userId),
  name: '',
};
export interface User {
  id: string
  name?: string
}

function App() {
  const [roomId, setRoom] = React.useState('');
  const [messages, setMessage] = React.useState<any[]>([]);
  const [ready, setReady] = React.useState(false);
  const {
    loading,
    responseData: roomList,
  } = useQueryRooms();

  React.useEffect(() => {
    socket.emit('chat-message', 'HI from client');
    socket.on(SOCKET_EVENT.ROOM_MES, (e: any) => {
      console.log(e);
      setMessage(m => [...m, e]);
    });

    socket.on(SOCKET_EVENT.GAME_STATUS, (e: any) => {
      console.log(e);
      if(e && e.message) {
        setMessage(m => [...m, e]);
      }
    });

    return () => {
      socket
        .off(SOCKET_EVENT.GAME_STATUS)
        .off(SOCKET_EVENT.ADD_COUNT)
        .off(SOCKET_EVENT.ROOM_MES);
    };
  }, [roomId]);

  const handleJoinRoom = (roomId='', user: User) => () => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, {
      roomId,
      user,
    });
    setRoom(roomId);
  };

  const handleSendMessage = () => {
    socket.emit('chat-message', {
      roomId,
      message: 'Send Message From Room: ' + roomId,
      user,
    });
  };

  const handleSetReady = useCallback(() => {
    // setState會觸發兩次，所以emit不適合放裡面
    setReady(r => {
      const isReady = !r;
      return isReady;
    });
  }, []);

  useEffect(() => {
    socket.emit(SOCKET_EVENT.USER_ACTION, {
      userActionType: USER_ACTION.SET_READY,
      userId: user.id,
      isReady: ready,
    });
  }, [ready]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{'Ito Online'}</h1>
        {roomId && <h2>{`Room: ${roomId}`}</h2>}
        <h2>{`User: ${user.name || user.id }`}</h2>
        {roomList.map(r => (
          <button onClick={handleJoinRoom(r.id, user)}>
            {`Join ${r.name ? r.name : r.id}`}
            <h2>{`Players: ${r.players.length}`}</h2>
          </button>
        ))}
      </header>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
        <button onClick={handleSetReady}>
          <h2>{ready ? 'Waiting others...' : 'Ready'}</h2>
        </button>
        {messages.map((m, i) => (
          <div key={i}>{JSON.stringify(m)}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
