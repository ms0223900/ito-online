import React from 'react';
import { Box, makeStyles, Modal, Typography } from '@material-ui/core';
import { PlayedResultProps } from './types';
import FailSuccessResult from './FailSuccessResult';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    
  }
}));

const PlayedResult = ({
  isResultOpen,
  resultType,
  resultPayload,
  onCloseResult,
}: PlayedResultProps) => {
  const classes = useStyles();

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
          {resultType === 'SUCCESS' && (

          )}
          {resultType === 'GAME_OVER' && (
            
          )}
        </Box>
      </Modal>
    </>
  );
};

export default PlayedResult;