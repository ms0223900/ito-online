import React from 'react';
import { Box } from '@material-ui/core';
import CreateRoomPart from '../components/CreateRoomPart';
import useCreateRoomPart from './functions/useCreateRoomPart';

const CreateRoomPartContainer = () => {
  const {
    value,
    handleChangeInput,
    handleCreateRoom,
  } = useCreateRoomPart();

  return (
    <CreateRoomPart
      value={value}
      onChange={handleChangeInput}
      onCreateRoom={handleCreateRoom}
    />
  );
};

export default CreateRoomPartContainer;