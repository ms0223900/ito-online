declare module "common-types" {
  export type Callback = (...args: any[]) => any;
  
  export interface SinglePlayer {
    id: string
    name?: string
  }

  export interface SingleRoom {
    id: string
    name?: string
    players: SinglePlayer[]
  }
}