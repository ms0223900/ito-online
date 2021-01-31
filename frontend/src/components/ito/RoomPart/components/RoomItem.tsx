import React from 'react';
import { Box, ListItem, Typography } from '@material-ui/core';
import { RoomItemProps } from './types';
import { AccountCircle } from '@material-ui/icons';

const RoomItem = (props: RoomItemProps) => {
  return (
    <ListItem>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Typography variant={'h5'}>
            {props.room.name || props.room.id}
          </Typography>
        </Box>
        <Box>
          <AccountCircle fontSize={'large'} />
          <Typography variant={'h5'}>
            {props.playersAmount}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default RoomItem;