import React from 'react';
import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { PlayedResultProps } from './types';
import FailSuccessResult from './FailSuccessResult';
import ContinuedResult from './ContinuedResult';
import GameoverResult from './GameoverResult';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    
  }
}));

const PlayedResult = (props: PlayedResultProps) => {
  const {
    isResultOpen,
    resultPayload,
    onCloseResult,
  } = props;
  const classes = useStyles();

  if(!resultPayload) {
    return null;
  }

  return (
    <>
      <Modal 
        className={classes.modal}
        open={isResultOpen}
        onClose={onCloseResult}
      >
        <Box>
          {resultPayload && (
            <FailSuccessResult 
              {...resultPayload}
              onConfirmResult={onCloseResult}
            />
          )}
          {resultPayload.resultType === 'CONTINUED' && (
            <ContinuedResult 
              {...props} 
              passedRounds={resultPayload.passedRounds}
            />
          )}
          {resultPayload.resultType === 'GAME_OVER' && (
            <GameoverResult 
              {...props} 
              passedRounds={resultPayload.passedRounds}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PlayedResult;