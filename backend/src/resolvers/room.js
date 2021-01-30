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

const updateRoom = async (_, { user, }, ctx) => {

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
  deleteRoom,
};