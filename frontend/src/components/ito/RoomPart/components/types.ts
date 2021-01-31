import { SingleRoom } from "../../../../api/custom-hooks/useQueryRooms";

export interface RoomItemProps {
  room: SingleRoom
  playersAmount: number
}
export interface RoomListProps {
  roomListData: RoomItemProps[]
}

export interface RoomPartProps extends RoomListProps {
  onCreateRoom: (e: any) => any
}