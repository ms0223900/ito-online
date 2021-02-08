import React from 'react';
import { Box, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import { PlayedResultPayload, PlayedResultProps } from './types';
import FailSuccessResult from './FailSuccessResult';
import ContinuedResult from './ContinuedResult';
import GameoverResult from './GameoverResult';
import ModalWrapper from 'components/ito/Common/components/wrappers/ModalWrapper';

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
  return null;
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
    <ModalWrapper open={isResultOpen} onClose={onCloseResult}>
      {getModalResult(props)}
    </ModalWrapper>
  );
};

export default PlayedResult;