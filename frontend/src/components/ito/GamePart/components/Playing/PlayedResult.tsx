import React from 'react';
import { Box, Modal, Typography } from '@material-ui/core';
import { PlayedResultProps } from './types';
import FailSuccessResult from './FailSuccessResult';

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
            <FailSuccessResult {...resultPayload} />
          )}
        </>
      </Modal>
    </>
  );
};

export default PlayedResult;