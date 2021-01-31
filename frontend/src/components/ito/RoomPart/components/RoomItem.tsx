import React from 'react';
import { Box, ListItem, Typography } from '@material-ui/core';
import { RoomItemProps } from './types';
import { AccountCircle } from '@material-ui/icons';

const RoomItem = (props: RoomItemProps) => {
  return (
    <ListItem button divider>
      <Box
        width={'100%'}
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
          <Box component={'span'}>
            {props.playersAmount}
          </Box>
        </Box>
      </Box>
    </ListItem>
  );
};

export default RoomItem;