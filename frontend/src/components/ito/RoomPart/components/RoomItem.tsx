import React from 'react';
import { Box, ListItem, Typography } from '@material-ui/core';
import { RoomItemProps } from './types';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/ROUTES';
import { replaceRouterParamsRegExp } from 'constants/regExps';

const RoomItem = (props: RoomItemProps) => {
  const linkTo = ROUTES.room.replace(replaceRouterParamsRegExp, props.room.id);
  
  return (
    <Link to={linkTo}>
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
    </Link>
  );
};

export default RoomItem;