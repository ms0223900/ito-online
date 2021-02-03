import { ActionTypes, ItoActions } from "actions";
import { ItoState } from "constants/context";
import { combineReducers } from "react-function-helpers";

const gamePlayingStatus = (state: ItoState, action: ItoActions): ItoState['gamePlayingStatus'] => {
  switch (action.type) {
    case ActionTypes.SET_GAME_PLAYING_STATUS:
      return action.payload;
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