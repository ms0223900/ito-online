import React, { useMemo } from 'react';
import { Box } from '@material-ui/core';
import { LifeListProps } from './types';
import LifeItem, { LifeItemProps } from './LifeItem';

export const makeLifeListData = (maxLife: number, remainLife: number): LifeItemProps[] => {
  const lifeList = [...Array(maxLife).keys()];
  const lifeListData = lifeList.map((l, i) => ({
    isHavingLife: i < remainLife,
  }));
  return lifeListData;
};

const LifeList = (props: LifeListProps) => {
  const lifeListData = useMemo(() => (
    makeLifeListData(props.maxLife, props.remainLife)
  ), [props]);

  return (
    <Box padding={1} display={'flex'}>
      {lifeListData.map((l, i) => (
        <LifeItem key={i} {...l} />
      ))}
    </Box>
  );
};

export default LifeList;