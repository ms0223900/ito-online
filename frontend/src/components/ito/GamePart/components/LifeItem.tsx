import React from 'react';
import { Box } from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';

export interface LifeItemProps {
  isHavingLife?: boolean
}

const color = '#D6032B';

const LifeItem = ({
  isHavingLife
}: LifeItemProps) => {
  return (
    <Box>
      {isHavingLife ? (
        <Favorite htmlColor={color} />
      ) : (
        <FavoriteBorderOutlined htmlColor={color} />
      )}
    </Box>
  );
};

export default LifeItem;