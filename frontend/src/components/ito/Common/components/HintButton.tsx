import React from 'react';
import { Box } from '@material-ui/core';
import ButtonInHeader from './ButtonInHeader';
import { HelpOutline } from '@material-ui/icons';
import { Callback } from 'common-types';

export interface HintButtonProps {
  onToggleHint: Callback
}

const HintButton = (props: HintButtonProps) => {
  return (
    <ButtonInHeader onClick={props.onToggleHint}>
      <HelpOutline />
    </ButtonInHeader>
  );
};

export default HintButton;