import { setGamePlayingStatus, updateGamePlayingStatus } from "actions";
import { PlayedResultPayload, PlayingPartProps } from "components/ito/GamePart/components/Playing/types";
import ContextStore from "constants/context";
import ItoSocket, { UpdatePlayedResultPayload } from "constants/itoSocket";
import useToggle from "lib/custom-hooks/useToggle";
import { send } from "process";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const usePlayingPart = () => {
  const {
    toggle: isResultOpen,
    setToggle: handleSetResultOpen,
    handleCloseToggle: handleCloseResult,
  } = useToggle();
  console.log(isResultOpen);

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
  // const [lifeNow, setLife] = useState();

  const handleUpdateMyCardNow = useCallback(() => {
    dispatch(
      updateGamePlayingStatus({
        key: 'status.myCardNow',
        value: null,
      })
    );
  }, []);

  const handleUpdateLife = useCallback((newLife: number) => {
    dispatch(
      updateGamePlayingStatus({
        key: 'status.life.lifeNow',
        value: newLife,
      })
    );
  }, []);

  const handlePlayCard = useCallback(() => {
    if(gamePlayingStatus.status) {
      const sender = ItoSocket.sendPlayCard({
        userId: user.id,
        cardNumber: gamePlayingStatus.status.myCardNow,
      });
      
      sender && handleUpdateMyCardNow();
    }
  }, [gamePlayingStatus.status, handleUpdateMyCardNow, user.id]);

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
            prevCardNumber: playedResult.cardNumber,
            nextCardNumber: playedResult.latestCard,
            result: resultType,
          });
          handleUpdateLife(playedResult.latestLife);
        }
        break;
      }
      case 'CONTINUED': 
        if(playedResult) {
          setPlayedResult({
            prevCardNumber: playedResult.cardNumber,
            nextCardNumber: playedResult.latestCard,
            result: resultType,
          });
        }
        break;
      case 'GAME_OVER':
        break;
      default:
        break;
    }
  }, [handleUpdateLife]);

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

  const playingPartProps: PlayingPartProps | undefined = useMemo(() => {
    const { status } = gamePlayingStatus;
    return (
      status ? ({
        ...status.question,
        isResultOpen,
        cardNumberNow: status.myCardNow,
        latestCardNumber: status.latestCard,
        maxLife: status.life.maxLife,
        remainLife: status.life.lifeNow,
        resultPayload: playedResult,
        onCloseResult: handleCloseResult,
        onPlayCard: handlePlayCard,
      }) as PlayingPartProps : undefined
    );
  }, [gamePlayingStatus, handleCloseResult, handlePlayCard, isResultOpen, playedResult]);

  return ({
    playingPartProps
  });
};

export default usePlayingPart;