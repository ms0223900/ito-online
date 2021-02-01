
import { Callback, GameStatusKeys, SingleUser } from 'common-types';
import { GAME_STATUS, SOCKET_EVENT, USER_ACTION } from 'config';
import { io } from 'socket.io-client';
import { API_URI } from './API';

export const socket = io(API_URI);

export interface UserReadyPayload {
  userId: string
  isReady: boolean
}
export interface UserJoinRoomPayload {
  roomId: string
  user: SingleUser
}

export interface PlayerUpdateReadyPayload {
  gameStatus: GameStatusKeys
  userId: string
  isReady: boolean
}

const ItoSocket = {
  listenGameStatus(callback: Callback) {
    socket.on(SOCKET_EVENT.GAME_STATUS, callback);
    return () => socket.off(SOCKET_EVENT.GAME_STATUS);
  },
  listenPlayerReadyUpdate(callback: Callback) {
    return this.listenGameStatus(payload => {
      if(payload.gameStatus === GAME_STATUS.UPDATE_READY) {
        callback(payload);
      }
    });
  },

  sendUserAction(payload: Record<string, any>) {
    socket.emit(SOCKET_EVENT.USER_ACTION, payload);
  },

  sendUserReady({ userId, isReady, }: UserReadyPayload) {
    this.sendUserAction({
      userActionType: USER_ACTION.SET_READY,
      userId,
      isReady,
    });
  },

  sendUserJoinRoom({ roomId, user, }: UserJoinRoomPayload) {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, {
      roomId,
      user,
    });
  },
};

export default ItoSocket;