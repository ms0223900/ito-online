
import { Callback } from 'common-types';
import { SOCKET_EVENT, USER_ACTION } from 'config';
import { io } from 'socket.io-client';
import { API_URI } from './API';

export const socket = io(API_URI);

export interface UserReadyPayload {
  userId: string
  isReady: boolean
}

const ItoSocket = {
  listenGameStatus(callback: Callback) {
    socket.on(SOCKET_EVENT.GAME_STATUS, callback);
    return () => socket.off(SOCKET_EVENT.GAME_STATUS);
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
  }
};

export default ItoSocket;