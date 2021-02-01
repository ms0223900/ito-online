import { SingleUser } from "common-types";

export interface ItoState {
  user: SingleUser
}

export const initItoState: ItoState = {
  user: {
    id: 'aabbb',
    // id: '',
    name: 'Mock User'
  }
};

