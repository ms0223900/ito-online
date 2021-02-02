
import { Callback, GameStatus, GameStatusKeys, SingleUser } from 'common-types';
import { GAME_STATUS, SOCKET_EVENT, USER_ACTION, GameStatusTypes } from 'config';
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

export interface BasicGameStatusPayload {
  gameStatus: GameStatusKeys
}
export interface PlayerUpdateReadyPayload {
  gameStatus: GameStatusTypes.UPDATE_READY
  userId: string
  isReady: boolean
}
export interface AddPlayerPayload {
  gameStatus: GameStatusTypes.ADD_PLAYER
  user: SingleUser
}
export interface RemovePlayerPayload {
  gameStatus: GameStatusTypes.REMOVE_PLAYER
  userId: string
}
export type GameStatusPayload = 
  PlayerUpdateReadyPayload |
  AddPlayerPayload | 
  RemovePlayerPayload 

const ItoSocket = {
  onListenGameStatus({
    onAddPlayer, onRemovePlayer, onUpdatePlayerReady,
  }: {
    onRemovePlayer?: Callback
    onAddPlayer?: Callback
    onUpdatePlayerReady?: Callback
  }) {
    socket.on(SOCKET_EVENT.GAME_STATUS, (payload: GameStatusPayload) => {
      if(payload) {
        switch (payload.gameStatus) {
          case GameStatusTypes.ADD_PLAYER:
            return onAddPlayer && onAddPlayer(payload);
          case GameStatusTypes.UPDATE_READY:
            return onUpdatePlayerReady && onUpdatePlayerReady(payload);
          case GameStatusTypes.REMOVE_PLAYER:
            return onRemovePlayer && onRemovePlayer(payload);
          default:
            break;
        }
      }
    });
    
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
  },

  sendUserJoinRoom({ roomId, user, }: UserJoinRoomPayload) {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, {
      roomId,
      user,
    });
  },
};

export default ItoSocket;