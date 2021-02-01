import React from 'react';
import { Box, List } from '@material-ui/core';
import { PlayerListProps } from './types';
import PlayerItem from './PlayerItem';

const PlayerList = (props: PlayerListProps) => {
  return (
    <List>
      {props.playerListData.map((p, i) => (
        <PlayerItem
          key={i}
          {...p}
        />
      ))}
    </List>
  );
};

export default PlayerList;  