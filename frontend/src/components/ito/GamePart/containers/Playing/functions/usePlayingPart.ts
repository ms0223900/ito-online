import { setGamePlayingStatus, SetGamePlayingStatusPayload, updateGamePlayingStatus } from "actions";
import { PlayedResultPayload, PlayingPartProps } from "components/ito/GamePart/components/Playing/types";
import ContextStore from "constants/context";
import ItoSocket, { UpdatePlayedResultPayload } from "constants/itoSocket";
import ROUTES from "constants/ROUTES";
import useToggle from "lib/custom-hooks/useToggle";
import { send } from "process";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

const handleSetGameStatus = (dispatch: any) => (payload: SetGamePlayingStatusPayload) => {
  dispatch(
    setGamePlayingStatus(payload)
  );
};

const handleUpdateMyCardNow = (dispatch: any) => () => {
  dispatch(
    updateGamePlayingStatus({
      key: 'status.myCardNow',
      value: null,
    })
  );
};

const handleUpdateLife = (dispatch: any) => (newLife: number) => {
  dispatch(
    updateGamePlayingStatus({
      key: 'status.life.lifeNow',
      value: newLife,
    })
  );
};

const usePlayingPart = () => {
  const {
    toggle: isResultOpen,
    setToggle: handleSetResultOpen,
    handleCloseToggle: handleCloseResult,
  } = useToggle();
  const history = useHistory();

  const {
    state: {
      user,
      gamePlayingStatus,
    },
    dispatch,
  } = useContext(ContextStore);
  const {
    id: userId,
  } = user;
  const {
    roomId,
  } = gamePlayingStatus;

  const [playedResult, setPlayedResult] = useState<PlayedResultPayload>();


  const handlePlayCard = useCallback(() => {
    if(gamePlayingStatus.status) {
      const sender = ItoSocket.sendPlayCard({
        userId: user.id,
        cardNumber: gamePlayingStatus.status.myCardNow,
      });
      
      sender && handleUpdateMyCardNow(dispatch)();
    }
  }, [dispatch, gamePlayingStatus.status, user.id]);

  const handleGetComparedResult = useCallback((payload: UpdatePlayedResultPayload) => {
    const {
      resultType,
      playedResult,
    } = payload;
    // open result
    handleSetResultOpen(true);
    
    switch (resultType) {
      case 'SUCCESS':
      case 'FAIL': {
        if(playedResult) {
          setPlayedResult({
            ...payload,
            prevCardNumber: playedResult.prevCard,
            nextCardNumber: playedResult.latestCard,
          });
          handleUpdateLife(dispatch)(playedResult.latestLife);
        }
        break;
      }
      case 'CONTINUED': 
        if(playedResult) {
          setPlayedResult({
            ...payload,
            prevCardNumber: playedResult.prevCard,
            nextCardNumber: playedResult.latestCard,
          });
        }
        break;
      case 'GAME_OVER':
        break;
      default:
        break;
    }
  }, [dispatch, handleSetResultOpen]);

  const handleContinue = useCallback(() => {
    // ItoSocket.
  }, []);

  const handleOvergame = useCallback(() => {
    history.push(ROUTES.rooms);
  }, []);

  useEffect(() => {
    // join room
    ItoSocket.sendUserJoinRoom({
      user, roomId,
    });
    // 取得最新卡片比較結果、愛心
    const listener = ItoSocket.onListenGameStatus({
      onGetComparedResult: handleGetComparedResult,
    });
    return () => {
      listener();
      ItoSocket.sendUserLeaveRoom({
        userId, roomId,
      });
    };
  }, []);
  console.log(gamePlayingStatus);

  const playingPartProps: PlayingPartProps | undefined = useMemo(() => {
    const { status } = gamePlayingStatus;
    return (
      status ? ({
        ...status.question,
        ...playedResult,
        isResultOpen,
        cardNumberNow: status.myCardNow,
        latestCardNumber: status.latestCard,
        maxLife: status.life.maxLife,
        remainLife: status.life.lifeNow,
        resultPayload: playedResult,
        onCloseResult: handleCloseResult,
        onPlayCard: handlePlayCard,
        onContinue: handleContinue,
        onOverGame: handleOvergame,
      }) : undefined
    );
  }, [gamePlayingStatus, handleCloseResult, handleContinue, handleOvergame, handlePlayCard, isResultOpen, playedResult]);

  return ({
    playingPartProps
  });
};

export default usePlayingPart;