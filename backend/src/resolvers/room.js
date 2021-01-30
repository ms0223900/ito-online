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
    // const rooms = await Room.model.find();
    const rooms = mockRooms;
    return rooms;
  } catch (error) {
    console.log(error);
  }
};

const deleteRoom = async (roomId='') => {
  try {
    // const rooms = await Room.model.find();
    const rooms = Room.model.findByIdAndDelete(roomId, _, (err, _, res) => {
      
    });
    return rooms;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRooms,
  deleteRoom,
};