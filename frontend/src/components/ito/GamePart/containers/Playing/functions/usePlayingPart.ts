import { setGamePlayingStatus } from "actions";
import { PlayedResultPayload, PlayingPartProps } from "components/ito/GamePart/components/Playing/types";
import ContextStore from "constants/context";
import ItoSocket from "constants/itoSocket";
import useToggle from "lib/custom-hooks/useToggle";
import { send } from "process";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const usePlayingPart = () => {
  const {
    toggle: isResultOpen,
    handleCloseToggle,
  } = useToggle();

  const {
    state: {
      user,
      gamePlayingStatus,
    },
    dispatch,
  } = useContext(ContextStore);

  const [playedResult, setPlayedResult] = useState<PlayedResultPayload>();
  const [lifeNow, setLife] = useState();

  const handlePlayCard = useCallback(() => {
    if(gamePlayingStatus.status) {
      const sender = ItoSocket.sendPlayCard({
        userId: user.id,
        cardNumber: gamePlayingStatus.status.myCardNow,
      });
      
      sender && dispatch(setGamePlayingStatus({
        ...gamePlayingStatus,
        status: {
          ...gamePlayingStatus.status,
          myCardNow: null
        }
      }));
    }
  }, [dispatch, gamePlayingStatus, user.id]);

  const handleCloseResult = useCallback(() => {
    handleCloseToggle();
  }, []);

  useEffect(() => {
    // 取得最新卡片比較結果、愛心
    const listener = ItoSocket.onListenGameStatus({

    });
    return () => {
      listener();
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