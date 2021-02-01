import { SinglePlayer } from "common-types";

export interface ItoState {
  user: SinglePlayer
}

export const initItoState: ItoState = {
  user: {
    id: 'aabbb',
    // id: '',
    name: 'Mock User'
  }
};

