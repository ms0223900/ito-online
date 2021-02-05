import React from 'react';
import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { PlayedResultPayload, PlayedResultProps } from './types';
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

export const getModalResult = (props: PlayedResultProps) => {
  const { resultPayload } = props;

  if(resultPayload) {
    if(resultPayload.resultType === 'CONTINUED') {
      return (
        <ContinuedResult 
          {...props} 
          passedRounds={resultPayload.passedRounds}
        />
      );
    } 
    
    else if(resultPayload.resultType === 'GAME_OVER') {
      return (
        <GameoverResult 
          {...props} 
          passedRounds={resultPayload.passedRounds}
        />
      );
    }

    return (
      <FailSuccessResult 
        {...resultPayload}
        onConfirmResult={props.onCloseResult}
      />
    );
  }
};

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
          {getModalResult(props)}
        </Box>
      </Modal>
    </>
  );
};

export default PlayedResult;