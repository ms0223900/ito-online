import React from 'react';
import { Box, Modal, Typography } from '@material-ui/core';
import { PlayedResultProps } from './types';

const PlayedResult = ({
  isResultOpen,
  resultPayload,
  onCloseResult,
}: PlayedResultProps) => {
  return (
    <>
      <Modal 
        open={isResultOpen}
        onClose={onCloseResult}
      >
        <>
          {resultPayload && (
            <Box textAlign={'center'}>
              <Typography variant={'h5'}>
                {resultPayload.nextCardNumber}
                {resultPayload.result === 'SUCCESS' ? '<' : '>'}
                {resultPayload.prevCardNumber}
              </Typography>
              <Typography variant={'h4'}>{resultPayload.result}</Typography>              
            </Box>
          )}
        </>
      </Modal>
    </>
  );
};

export default PlayedResult;