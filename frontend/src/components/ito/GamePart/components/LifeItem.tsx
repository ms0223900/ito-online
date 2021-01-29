import React from 'react';
import { Box } from '@material-ui/core';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';

export interface LifeItemProps {
  isHavingLife?: boolean
}

const LifeItem = ({
  isHavingLife
}: LifeItemProps) => {
  return (
    <Box>
      {isHavingLife ? (
        <Favorite />
      ) : (
        <FavoriteBorderOutlined />
      )}
    </Box>
  );
};

export default LifeItem;