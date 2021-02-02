import React from 'react';
import { Box, Button, ButtonProps } from '@material-ui/core';

export interface CTAButtonProps extends ButtonProps {
  
}

const CTAButton = (props: CTAButtonProps) => {
  return (
    <Box paddingY={1} textAlign={'center'}>
      <Button color={'primary'} variant={'outlined'} {...props} />
    </Box>
  );
};

export default CTAButton;