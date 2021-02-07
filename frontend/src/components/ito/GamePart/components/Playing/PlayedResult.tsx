import React from 'react';
import { Box, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
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
  content: {
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    
  }
}));

export const getModalResult = (props: PlayedResultProps) => {
  const { resultPayload } = props;

  if(resultPayload) {
    switch (resultPayload.resultType) {
      case 'CONTINUED':
      case 'CONTINUED_FAILED':
        return (
          <ContinuedResult 
            {...props}
            isContinuedFailed={resultPayload.resultType === 'CONTINUED_FAILED'}
            passedRounds={resultPayload.passedRounds}
          />
        );
      case 'GAME_OVER':
        return (
          <GameoverResult 
            {...props} 
            passedRounds={resultPayload.passedRounds}
          />
        );
      default:
        return (
          <FailSuccessResult 
            {...resultPayload}
            onConfirmResult={props.onCloseResult}
          />
        );
    }
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
        <Paper className={classes.content}>
          {getModalResult(props)}
        </Paper>
      </Modal>
    </>
  );
};

export default PlayedResult;