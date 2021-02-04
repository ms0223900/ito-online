import { GamePlayingStatus, SingleUser } from "common-types";
import { GamePlayingStatusState } from "constants/context";

export enum ActionTypes {
  SET_GAME_PLAYING_STATUS,
  UPDATE_GAME_PLAYING_STATUS,
  RESET_GAME_PLAYING_STATUS,

  SET_USER,
  RESET_USER,
}

export interface SetGamePlayingStatusPayload extends GamePlayingStatusState {
  
}
export interface UpdateGamePlayingStatusPayload {
  key: string // 例如 "status.myCardNow"
  value: any
}
export interface SetGamePlayingStatus {
  type: ActionTypes.SET_GAME_PLAYING_STATUS
  payload: SetGamePlayingStatusPayload
}
export interface UpdateGamePlayingStatus {
  type: ActionTypes.UPDATE_GAME_PLAYING_STATUS
  payload: UpdateGamePlayingStatusPayload
}
export interface ResetGamePlayingStatus {
  type: ActionTypes.RESET_GAME_PLAYING_STATUS
}

export const setGamePlayingStatus = (payload: SetGamePlayingStatusPayload) => ({
  type: ActionTypes.SET_GAME_PLAYING_STATUS,
  payload,
});
export const updateGamePlayingStatus = (payload: UpdateGamePlayingStatusPayload) => ({
  type: ActionTypes.UPDATE_GAME_PLAYING_STATUS,
  payload,
});
export const resetGamePlayingStatus = () => ({
  type: ActionTypes.RESET_GAME_PLAYING_STATUS,
});


export interface SetUserPayload extends SingleUser {
  
}
export interface SetUser {
  type: ActionTypes.SET_USER
  payload: SetUserPayload
}

export const setUser = (payload: SetUserPayload) => ({
  type: ActionTypes.SET_USER,
  payload,
});


export type ItoActions = 
  SetGamePlayingStatus |
  UpdateGamePlayingStatus |
  SetUser

