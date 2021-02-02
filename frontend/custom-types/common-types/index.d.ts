declare module "common-types" {
  type Callback = (...args: any[]) => any;
  
  interface SingleUser {
    id: string
    name?: string
    isReady?: boolean
  }

  interface SingleRoom {
    id: string
    name?: string
    players: SingleUser[]
  }

  interface GameStatus {
    READY: string
    START: string
    CONTINUED: string
    PASS: string
    OVER: string
    ERROR: string

    UPDATE_READY: string
    ADD_PLAYER: string
    REMOVE_PLAYER: string
  }
  type GameStatusKeys = keyof GameStatus
}