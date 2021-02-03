import { SetGamePlayingStatusPayload } from "actions";
import { GamePlayingStatus, GamePlayingStatusFromSocketPayload, SingleUser } from "common-types";
import { GAME_STATUS } from "config";

const defaultPayload: SetGamePlayingStatusPayload = ({
  message: '',
  status: null,
});

const makeGamePlayingPayload = (
  user: SingleUser, 
  payloadFromSocket: GamePlayingStatusFromSocketPayload
): SetGamePlayingStatusPayload => {
  switch (payloadFromSocket.gameStatus) {
    case GAME_STATUS.START: {
      const {
        playerCardAndQuestionList,
      } = payloadFromSocket;
      const matchedPlayerStatus = playerCardAndQuestionList.find(p => p.player.id === user.id);

      if(!matchedPlayerStatus) {
        return ({
          ...defaultPayload,
          message: 'player-not-found.'
        });
      }

      const status: GamePlayingStatus = {
        question: {
          question: matchedPlayerStatus.question.content,
        },
        isPlaying: true,
        life: matchedPlayerStatus.life,
        latestCard: matchedPlayerStatus.latestCard,
        myCardNow: matchedPlayerStatus.card,
      };

      return ({
        ...payloadFromSocket,
        status,
      });
    }
    case GAME_STATUS.ERROR:
      return ({
        ...payloadFromSocket,
        status: null,
      });
      
    default:
      return defaultPayload;
  }
};

export default makeGamePlayingPayload;