import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';

export interface EmptyMessageProps {
  children: ReactNode
}

const EmptyMessage = ({
  children,
}: EmptyMessageProps) => {
  return (
    <Box textAlign={'center'} paddingY={1} color={'textSecondary'}>
      {children}
    </Box>
  );
};

export default EmptyMessage;