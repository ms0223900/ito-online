const ROUTES = {
  createUser: '/create-user',
  createQuestion: '/create-question',
  createRoom: '/create-room',
  homepage: '/',
  rooms: '/rooms',
  room: '/room/:roomId',
  playing: '/playing',
};

export interface RouterParams {
  roomId: string
}

export default ROUTES;