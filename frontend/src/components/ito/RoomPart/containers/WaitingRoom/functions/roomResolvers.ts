import { SingleRoom } from "common-types";
import { AddPlayerPayload, PlayerUpdateReadyPayload, RemovePlayerPayload } from "constants/itoSocket";

const roomResolvers = {
  udpateRoomUser: (state: { room: SingleRoom | undefined, }, payload: PlayerUpdateReadyPayload) => {
    const { room: _room, } = state;
    const { userId, isReady, } = payload;

    if(_room) {
      const players = _room.users;
      let _players = [...players];
      const playerIdx = _players.findIndex(p => p.id === userId);

      if(playerIdx !== -1) {
        _players[playerIdx] = {
          ..._players[playerIdx],
          isReady,
        };
        return _room;
      }
    }
    return _room;
  },

  addPlayer(state: { room: SingleRoom | undefined, }, payload: AddPlayerPayload) {
    const { room: _room, } = state;
    const {
      user,
    } = payload;
    if(!_room) {
      return _room;
    } else {
      let newRoom = {
        ..._room,
        users: [
          ..._room.users,
          user,
        ]
      };
      return newRoom;
    }
  },

  removePlayer(state: { room: SingleRoom | undefined, }, payload: RemovePlayerPayload) {
    const { room, } = state;
    if(!room) {
      return room;
    } else {
      const {
        userId
      } = payload;

      const newRoom = {
        ...room,
        users: room.users.filter(u => u.id !== userId)
      };
      return newRoom;
    }
  },
};

export default roomResolvers;