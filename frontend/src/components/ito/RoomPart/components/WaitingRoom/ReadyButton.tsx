import React from 'react';
import { ReadyButtonProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const ReadyButton = (props: ReadyButtonProps) => {
  return (
    <CTAButton onClick={props.onReady}>
      {props.isPlayerReady ? 'Waiting for others...' : 'Ready'}
    </CTAButton>
  );
};

export default ReadyButton;