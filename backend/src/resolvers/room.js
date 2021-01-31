const Room = require('../model/Room');

const mockRooms = [
  {
    id: '1234',
    name: 'Room001'
  },
  {
    id: '1235',
    name: 'Room002'
  },
];

const getRooms = async () => {
  try {
    const rooms = await Room.model.find();
    // const rooms = mockRooms;
    return rooms;
  } catch (error) {
    console.log(error);
  }
};

const createRoom = async (_, { firstUser, }, ctx) => {
  const newRoom = new Room.model({
    users: [firstUser],
  });
  const room = await newRoom.save();
  return room;
};

const updateRoom = async (_, { type, roomId, user, }, ctx) => {
  const room = await Room.model.findById(roomId);
  if(room) {
    if(!user) {
      throw new Error('User not input');
    }
    const players = room.players;
    let newPlayers = [...players];

    switch (type) {
    case 'REMOVE_PLAYER': {
      newPlayers = newPlayers.filter(p => p.id !== user.id);  
    }
    case 'ADD_PLAYER': {
      newPlayers.push(user);
    }
    default:
      break;
    }

    room.players = newPlayers;
    await room.save();
    return room;
  } else {
    throw new Error('Room not found.');
  }
};

const deleteRoom = async (_, { roomId, }, ctx) => {
  try {
    // const rooms = await Room.model.find();
    await Room.model.findByIdAndDelete(roomId, _, (err, _, res) => {
      console.log(res);
    });
    return ({
      message: `Room: ${roomId} deleted successfully.`
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};