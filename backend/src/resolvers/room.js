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
    const roomsWithId = rooms.map(r => ({
      id: r._id,
      _id: r._id,
      name: r.name,
      players: r.players.map(u => u ? {
        _id: u._id,
        name: u.name,
        id: u.id,
      } : u),
    }));
    return roomsWithId;
  } catch (error) {
    console.log(error);
  }
};

const getRoom = async (_, { roomId, }) => {
  try {
    const room = await Room.model.findById(roomId);
    return room;
  } catch (error) {
    throw new Error('Find room failed.');
  }
};

const createRoom = async (_, { firstUser, name, }, ctx) => {
  const newRoom = new Room.model({
    name,
    players: [firstUser],
  });
  console.log('New room:', newRoom);
  const room = await newRoom.save();
  return room;
};

const updateRoom = async (_, payload, ctx) => {
  const { type, roomId, user, } = payload;
  const room = await Room.model.findById(roomId);
  console.log('Update room:', payload, room);
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
  getRoom,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};