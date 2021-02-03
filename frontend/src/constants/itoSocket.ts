
import { Callback, GamePlayingStatus, GameStatus, GameStatusKeys, ComparedPlayedResult, SingleUser, GamePlayingStatusFromSocketPayload, PlayedResultType } from 'common-types';
import { GAME_STATUS, SOCKET_EVENT, USER_ACTION, GameStatusTypes } from 'config';
import { io } from 'socket.io-client';
import { API_URI } from './API';
import { ItoState } from './context';

export const socket = io(API_URI);

export interface UserReadyPayload {
  userId: string
  isReady: boolean
}
export interface UserJoinRoomPayload {
  roomId: string
  user: SingleUser
}
export interface UserLeaveRoomPayload {
  roomId: string
  userId: string
}
export interface UserPlayCardPayload {
  userId: string
  cardNumber: GamePlayingStatus['myCardNow']
}

export interface BasicGameStatusPayload {
  gameStatus: GameStatusKeys
}
export interface PlayerUpdateReadyPayload {
  gameStatus: GameStatusTypes.UPDATE_READY
  userId: string
  isReady: boolean
}
export interface UpdateAllPlayersPayload {
  gameStatus: GameStatusTypes.UPDATE_ALL_USERS
  users: SingleUser[]
}
export interface AddPlayerPayload {
  gameStatus: GameStatusTypes.ADD_PLAYER
  user: SingleUser
}
export interface RemovePlayerPayload {
  gameStatus: GameStatusTypes.REMOVE_PLAYER
  userId: string
}
export type GameStartPayload = GamePlayingStatusFromSocketPayload
export interface UpdatePlayedResultPayload {
  gameStatus: GameStatusTypes.SET_PLAYED_RESULT
  resultType: PlayedResultType
  passedRounds: number
  playedResult?: ComparedPlayedResult
}

export type GameStatusPayload = 
  PlayerUpdateReadyPayload |
  UpdateAllPlayersPayload |
  AddPlayerPayload | 
  RemovePlayerPayload |
  GameStartPayload |
  UpdatePlayedResultPayload

const ItoSocket = {
  onListenGameStatus({
    onAddPlayer, onRemovePlayer, onUpdatePlayerReady, onUpdateAllPlayers, onGameStart, onGetComparedResult,
  }: {
    onRemovePlayer?: Callback
    onAddPlayer?: Callback
    onUpdatePlayerReady?: Callback
    onUpdateAllPlayers?: Callback
    onGameStart?: (payload: GameStartPayload) => any
    onGetComparedResult?: (payload: UpdatePlayedResultPayload) => any
  }) {
    socket.on(SOCKET_EVENT.GAME_STATUS, (payload: GameStatusPayload) => {
      console.log(payload);
      if(payload) {
        switch (payload.gameStatus) {
          case GameStatusTypes.UPDATE_ALL_USERS:
            return onUpdateAllPlayers && onUpdateAllPlayers(payload);
          case GameStatusTypes.ADD_PLAYER:
            return onAddPlayer && onAddPlayer(payload);
          case GameStatusTypes.UPDATE_READY:
            return onUpdatePlayerReady && onUpdatePlayerReady(payload);
          case GameStatusTypes.REMOVE_PLAYER:
            return onRemovePlayer && onRemovePlayer(payload);
          case GameStatusTypes.START: {
            return onGameStart && onGameStart(payload);
          }
          case GameStatusTypes.SET_PLAYED_RESULT:
            return onGetComparedResult && onGetComparedResult(payload);
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

  sendUserLeaveRoom({ roomId, userId, }: UserLeaveRoomPayload) {
    socket.emit(SOCKET_EVENT.LEAVE_ROOM, {
      roomId,
      userId,
    });
  },

  sendPlayCard({ userId, cardNumber, }: UserPlayCardPayload) {
    if(cardNumber) {
      socket.emit(SOCKET_EVENT.USER_ACTION, ({
        userId,
        cardNumber, 
      }));
      return true;
    }
    return false;
  },
};

export default ItoSocket;