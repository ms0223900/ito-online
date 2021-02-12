import { setGamePlayingStatus, SetGamePlayingStatusPayload, updateGamePlayingStatus } from "actions";
import { GamePlayingStatusFromSocketPayload, SingleUser } from "common-types";
import { PlayedResultPayload, PlayingPartProps } from "components/ito/GamePart/components/Playing/types";
import makeGamePlayingPayload from "components/ito/RoomPart/containers/WaitingRoom/functions/makeGamePlayingPayload";
import { GameStatusTypes, GAME_STATUS } from "config";
import ContextStore from "constants/context";
import ItoSocket, { UpdatePlayedResultPayload } from "constants/itoSocket";
import ROUTES from "constants/ROUTES";
import useEnterSocketRoom from "lib/custom-hooks/useEnterSocketRoom";
import useToggle from "lib/custom-hooks/useToggle";
import { send } from "process";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router";

const handleSetGameStatus = (dispatch: any) => (user: SingleUser, roomId: string) => (payload: GamePlayingStatusFromSocketPayload) => {
  const ctxPayload = makeGamePlayingPayload({
    user,
    roomId,
    payloadFromSocket: payload,
  });
  dispatch(
    setGamePlayingStatus(ctxPayload)
  );
};
const handleResetMyCardNow = (dispatch: any) => () => {
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
  const {
    toggle: isConfirmedContinue,
    setToggle: setConfirmed,
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
  useEnterSocketRoom({
    roomId, user,
  });
  console.log('Result open: ', isResultOpen);

  const [playedResult, setPlayedResult] = useState<PlayedResultPayload>();


  const handlePlayCard = useCallback(() => {
    if(gamePlayingStatus.status) {
      console.log(`UserId: ${user.id}`);
      console.log(`MyCardNow: ${gamePlayingStatus.status.myCardNow}`);
      const sender = ItoSocket.sendPlayCard({
        userId: user.id,
        cardNumber: gamePlayingStatus.status.myCardNow,
      });
      
      sender && handleResetMyCardNow(dispatch)();
    }
  }, [dispatch, gamePlayingStatus.status, user.id]);

  const handleGetComparedResult = useCallback((payload: UpdatePlayedResultPayload) => {
    const {
      resultType,
      playedResult,
    } = payload;
    // open result
    if(payload.gameStatus === GameStatusTypes.SET_PLAYED_RESULT) {
      console.log('open result');
      handleSetResultOpen(true);
    }
    
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
      case 'GAME_OVER':
        if(playedResult) {
          setPlayedResult({
            ...payload,
            prevCardNumber: playedResult.prevCard,
            nextCardNumber: playedResult.latestCard,
          });
        }
        break;
      default:
        break;
    }
  }, [dispatch]);

  const handleGameStart = useCallback((payload: GamePlayingStatusFromSocketPayload) => {
    console.log('Game start.');
    setConfirmed(false);
    handleCloseResult();
    handleSetGameStatus(dispatch)(user, roomId)(payload);
  }, [dispatch, handleCloseResult, roomId, setConfirmed, user]);

  const handleContinue = useCallback(() => {
    setConfirmed(true);
    ItoSocket.sendConfirmContinue(user.id);
  }, [user.id]);

  const handleOvergame = useCallback(() => {
    ItoSocket.sendConfirmLeave();
    history.push(ROUTES.rooms);
  }, []);

  const handleContinuedFailed = useCallback(() => {
    window.alert('Game continued failed :(');
    setPlayedResult(s => s ? ({
      ...s,
      resultType: 'CONTINUED_FAILED',
    }) : undefined);
  }, []);

  useEffect(() => {
    // 取得最新卡片比較結果、愛心
    const listener = ItoSocket.onListenGameStatus({
      onGetComparedResult: handleGetComparedResult,
      onGameStart: handleGameStart,
      onGameContinuedFailed: handleContinuedFailed,
    });
    return () => {
      listener();
    };
  }, [handleContinuedFailed, handleGameStart, handleGetComparedResult, roomId, user, userId]);
  // console.log(gamePlayingStatus);

  const onEvents = useMemo(() => ({
    onCloseResult: handleCloseResult,
    onPlayCard: handlePlayCard,
    onContinue: handleContinue,
    onOverGame: handleOvergame,
  }), [handleCloseResult, handleContinue, handleOvergame, handlePlayCard]);

  const playingPartProps: PlayingPartProps | undefined = useMemo(() => {
    const { status } = gamePlayingStatus;
    return (
      status ? ({
        ...status.question,
        // ...playedResult,
        ...onEvents,
        isConfirmed: isConfirmedContinue,
        isResultOpen,
        cardNumberNow: status.myCardNow,
        latestCardNumber: playedResult ? playedResult.nextCardNumber : null,
        maxLife: status.life.maxLife,
        remainLife: status.life.lifeNow,
        resultPayload: playedResult,
      }) : undefined
    );
  }, [gamePlayingStatus, playedResult, onEvents, isConfirmedContinue, isResultOpen]);

  return ({
    playingPartProps
  });
};

export default usePlayingPart;