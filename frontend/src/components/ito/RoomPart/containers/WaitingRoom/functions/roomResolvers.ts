import { SingleRoom } from "common-types";
import { AddPlayerPayload, PlayerUpdateReadyPayload, RemovePlayerPayload, UpdateAllPlayersPayload } from "constants/itoSocket";

export interface State {
  room: SingleRoom | undefined
}

const roomResolvers = {
  udpateRoomUser: (state: State, payload: PlayerUpdateReadyPayload) => {
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
        const newRoom = {
          ..._room,
          users: _players,
        };
        return newRoom;
      }
    }
    return _room;
  },

  updateRoomAllUsers: (state: State, payload: UpdateAllPlayersPayload) => {
    const { room: _room, } = state;
    const { users, } = payload;
    if(!_room) {
      return _room;
    } else {
      let newRoom = {
        ..._room,
        users,
      };
      return newRoom;
    }
  },

  addPlayer(state: State, payload: AddPlayerPayload) {
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

  removePlayer(state: State, payload: RemovePlayerPayload) {
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