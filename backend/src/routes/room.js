const { getRooms, createRoom, deleteRoom, getRoom } = require('../resolvers/room');

const roomGet = (app) => app.get('/rooms', async (req, res) => {
  const rooms = (await getRooms());
  res.send(rooms);
});

const roomGetSingle = (app) => app.get('/room/:roomId', async (req, res) => {
  const {
    roomId,
  } = req.params;
  if(!roomId) {
    throw new Error('Please input room id.');
  }
  const room = await getRoom({}, { roomId, });
  res.send(room);
});

const roomPost = (app) => app.post('/room', async (req, res) => {
  console.log('Request body: ', req.body);
  if(!req.body.type) {
    throw new Error('Please add type, such as CREATE or DELETE.');
  }
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
  roomGetSingle(app);
}

module.exports = {
  useRoomRoutes,
};