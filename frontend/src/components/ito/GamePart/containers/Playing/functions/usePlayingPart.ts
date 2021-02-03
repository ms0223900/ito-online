import { PlayedResultPayload, PlayingPartProps } from "components/ito/GamePart/components/Playing/types";
import ContextStore from "constants/context";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useContext, useMemo, useState } from "react";

const usePlayingPart = () => {
  const {
    toggle: isResultOpen,
    handleCloseToggle,
  } = useToggle();

  const {
    state: {
      gamePlayingStatus,
    }
  } = useContext(ContextStore);

  const [playedResult, setPlayedResult] = useState<PlayedResultPayload>();

  const handlePlayCard = useCallback(() => {

  }, []);

  const handleCloseResult = useCallback(() => {
    handleCloseToggle();
  }, []);

  const playingPartProps: PlayingPartProps | undefined = useMemo(() => (
    gamePlayingStatus ? ({
      ...gamePlayingStatus.question,
      isResultOpen,
      cardNumberNow: gamePlayingStatus.myCardNow,
      latestCardNumber: gamePlayingStatus.latestCard,
      maxLife: gamePlayingStatus.life.maxLife,
      remainLife: gamePlayingStatus.life.lifeNow,
      resultPayload: playedResult,
      onCloseResult: handleCloseResult,
      onPlayCard: handlePlayCard,
    }) as PlayingPartProps : undefined
  ), [gamePlayingStatus, handleCloseResult, handlePlayCard, isResultOpen, playedResult]);

  return ({
    playingPartProps
  });
};

export default usePlayingPart;