import React from 'react';
import { Box, ListItem, Typography } from '@material-ui/core';
import { PlayerItemProps } from './types';
import ReadyStandBy from './ReadyStandBy';

const PlayerItem = (props: PlayerItemProps) => {
  return (
    <ListItem divider>
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Typography variant={'h5'}>
          {props.playerName}
          {props.isMe && '(YOU)'}
        </Typography>
        <ReadyStandBy {...props} />
      </Box>
    </ListItem>
  );
};

export default PlayerItem;