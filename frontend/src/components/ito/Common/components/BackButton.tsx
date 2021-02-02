import React, { useCallback } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { ArrowLeftOutlined } from '@material-ui/icons';
import { Callback } from 'common-types';
import { useHistory } from 'react-router';

export interface BackButtonProps {
  onBack?: Callback
}

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#ddd',
    }
  }
}));

const BackButton = ({
  onBack,
}: BackButtonProps) => {
  const classes = useStyles();

  const history = useHistory();
  const handleBack = useCallback(() => {
    history.goBack();
    onBack && onBack();
  }, []);
  
  return (
    <Box className={classes.root} padding={1} onClick={handleBack}>
      <ArrowLeftOutlined fontSize={'large'} />
    </Box>
  );
};

export default BackButton;