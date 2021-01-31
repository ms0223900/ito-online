import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { io } from 'socket.io-client';
import { API_URI } from './constants/API';
import useQueryRooms from './api/custom-hooks/useQueryRooms';
import { Container, makeStyles } from '@material-ui/core';
import ROUTES from 'constants/ROUTES';
import { SOCKET_EVENT, USER_ACTION } from 'config';
import RoomPartContainer from 'components/ito/RoomPart/containers/RoomPartContainer';
import CreateRoomPartContainer from 'components/ito/Forms/containers/CreateRoomPartContainer';

const socket = io(API_URI);

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

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500, 
  },

}));

function App() {
  const classes = useStyles();
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
    <Container className={classes.root}>
      <Switch>
        <Route
          exact
          path={ROUTES.homepage}
          component={RoomPartContainer}
        />
        <Route 
          path={ROUTES.rooms}
          component={RoomPartContainer}
        />
        <Route 
          path={ROUTES.room}
        />
        <Route 
          path={ROUTES.createUser}
        />
        <Route 
          path={ROUTES.createQuestion}
        />
        <Route 
          path={ROUTES.createRoom}
          component={CreateRoomPartContainer}
        />
      </Switch>
    </Container>
  );
}

export default App;
