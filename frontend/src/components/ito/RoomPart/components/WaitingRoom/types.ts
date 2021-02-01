import { Callback } from "common-types";

export interface ReadyStandByProps {
  isReady: boolean
  
}

export interface ReadyButtonProps {
  isPlayerReady: boolean
  onReady: Callback
}

export interface PlayerItemProps extends ReadyStandByProps {
  playerName: string
  isMe: boolean
}

export interface PlayerListProps {
  playerListData: PlayerItemProps[]
}

export interface WaitingRoomProps extends ReadyButtonProps, PlayerListProps {
  roomName: string
}