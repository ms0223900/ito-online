import { SingleUser } from "common-types";
import { combineReducers } from "react-function-helpers";
import { createContextStore, createContextValueFn } from 'react-function-helpers/lib/functions/contextHelpers';
import ContextWrapperFn from "react-function-helpers/lib/functions/ContextWrapper";

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

const reducers = combineReducers<ItoState>({
  user: s => s.user,
});

export const ContextValue = createContextValueFn(initItoState, reducers);
const ContextStore = createContextStore(initItoState);

export default ContextStore;
export const ContextWrapper = ContextWrapperFn(ContextValue, ContextStore);