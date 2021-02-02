import React from 'react';
import { Box, ListItem, makeStyles, Typography } from '@material-ui/core';
import { RoomItemProps } from './types';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/ROUTES';
import { replaceRouterParamsRegExp } from 'constants/regExps';

const useStyles = makeStyles(theme => ({
  root: {
    textDecoration: 'none',
    color: '#111',
  }
}));

const RoomItem = (props: RoomItemProps) => {
  const classes = useStyles();
  const linkTo = ROUTES.room.replace(replaceRouterParamsRegExp, props.room.id);
  
  return (
    <Link className={classes.root} to={linkTo}>
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