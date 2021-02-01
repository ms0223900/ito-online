import { GameStatus } from "common-types";

export enum SOCKET_EVENT {
  ADD_COUNT = 'ADD_COUNT',
  JOIN_ROOM = 'JOIN_ROOM',
  ROOM_MES = 'ROOM_MES',
  GAME_STATUS = 'GAME_STATUS',
  USER_ACTION = 'USER_ACTION',
  CHAT = 'CHAT',
};

export const GAME_STATUS: GameStatus = {
  READY: 'READY',
  UPDATE_READY: 'UPDATE_READY',
  START: 'START',
  CONTINUED: 'CONTINUED',
  PASS: 'PASS',
  OVER: 'OVER',
  ERROR: 'ERROR',
};

export enum USER_ACTION {
  PLAY_CARD = 'PLAY_CARD',
  SET_READY = 'SET_READY',
};