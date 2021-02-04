import { ActionTypes, ItoActions } from "actions";
import { ItoState } from "constants/context";
import setObjPropertyByKeysAndValue from "lib/functions/setObjPropertyByKeysAndValue";
import { combineReducers } from "react-function-helpers";

const gamePlayingStatus = (state: ItoState, action: ItoActions): ItoState['gamePlayingStatus'] => {
  switch (action.type) {
    case ActionTypes.SET_GAME_PLAYING_STATUS:
      return action.payload;
    case ActionTypes.UPDATE_GAME_PLAYING_STATUS: {
      const {
        key, value,
      } = action.payload;
      const newStatus = setObjPropertyByKeysAndValue(
        state.gamePlayingStatus, key, value
      );
      console.log('newStatus', newStatus);
      return newStatus;
    }
    default:
      return state.gamePlayingStatus;
  }
};

const user = (state: ItoState, action: ItoActions): ItoState['user'] => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return action.payload;
    default:
      return state.user;
  }
};

const reducers = combineReducers<ItoState>({
  user,
  gamePlayingStatus,
});

export default reducers;