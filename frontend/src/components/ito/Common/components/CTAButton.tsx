import React from 'react';
import { Box, Button, ButtonProps, makeStyles } from '@material-ui/core';

export interface CTAButtonProps extends ButtonProps {
  
}

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  button: {
    padding: theme.spacing(2),
  }
}));

const CTAButton = (props: CTAButtonProps) => {
  const classes = useStyles();

  return (
    <Box paddingY={1} textAlign={'center'}>
      <Button 
        className={classes.button}
        color={'primary'} 
        variant={'outlined'} 
        {...props} 
      />
    </Box>
  );
};

export default CTAButton;