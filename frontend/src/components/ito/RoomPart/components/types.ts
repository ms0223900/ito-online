import { Callback, SingleRoom } from "common-types";

export type EnterRoomFn = (roomId: string) => () => any

export interface RoomItemData {
  room: SingleRoom
  playersAmount: number
}
export interface RoomItemProps extends RoomItemData {
}
export interface RoomListProps {
  roomListData: RoomItemData[]
  onEnterRoom: EnterRoomFn
}

export interface RoomPartProps extends RoomListProps {
  loading?: boolean
  onCreateRoom: (e: any) => any
}