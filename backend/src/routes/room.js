const { getRooms, createRoom, deleteRoom } = require('../resolvers/room');

const roomGet = (app) => app.get('/rooms', async (req, res) => {
  const rooms = (await getRooms());
  res.send(rooms);
});

const roomPost = (app) => app.post('/room', async (req, res) => {
  console.log('Request body: ', req.body);
  switch (req.body.type) {
  case 'CREATE': {
    try {
      if(req.body.user && req.body.user.id) {
        const room = await createRoom({}, {
          name: req.body.name,
          firstUser: req.body.user,
        });
        res.send(room);
      } else {
        res.status(400).send({
          message: 'Need user id for create room.'
        });
      }
    } catch (e) {
      
    }
  }
  case 'DELETE': {
    try {
      if(req.body.roomId) {
        const deletedRes = await deleteRoom({}, { roomId: req.body.roomId, });
        res.send(deletedRes);
      }
    } catch (error) {
      console.log(error);
    }
  }
  default:
    break;
  }
});

function useRoomRoutes(app) {
  roomPost(app);
  roomGet(app);
}

module.exports = {
  useRoomRoutes,
};