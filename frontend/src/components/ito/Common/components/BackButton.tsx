import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { ArrowLeftOutlined } from '@material-ui/icons';
import { Callback } from 'common-types';
import { useHistory } from 'react-router';

export interface BackButtonProps {
  onBack?: Callback
}

const BackButton = ({
  onBack,
}: BackButtonProps) => {
  const history = useHistory();
  const handleBack = useCallback(() => {
    history.goBack();
    onBack && onBack();
  }, []);
  
  return (
    <Box padding={1} onClick={handleBack}>
      <ArrowLeftOutlined fontSize={'large'} />
    </Box>
  );
};

export default BackButton;