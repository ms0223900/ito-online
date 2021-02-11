import React, { ReactChildren, ReactNode } from 'react';
import { Box, BoxProps } from '@material-ui/core';

export interface ToggleDisplayWrapperProps extends BoxProps {
  isDisplay?: boolean
  children: ReactChildren | ReactNode
}

const ToggleDisplayWrapper = (props: ToggleDisplayWrapperProps) => {
  return (
    <Box
      {...props}
      style={{
        display: props.isDisplay ? 'block': 'none',
      }}
    >
      {props.children}
    </Box>
  );
};

export default ToggleDisplayWrapper;