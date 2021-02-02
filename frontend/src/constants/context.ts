import { SingleUser } from "common-types";

export interface ItoState {
  user: SingleUser
}
const userId = ~~(Math.random() * 100000);
export const initItoState: ItoState = {
  user: {
    id: String(userId),
    // id: '',
    name: 'Mock User ' + userId
  }
};

