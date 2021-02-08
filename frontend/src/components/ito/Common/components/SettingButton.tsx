import React from 'react';
import { Settings } from '@material-ui/icons';
import { Callback } from 'common-types';
import ButtonInHeader from './ButtonInHeader';

export interface SettingButtonProps {
  onToggleSetting: Callback
}

const SettingButton = (props: SettingButtonProps) => {
  return (
    <ButtonInHeader onClick={props.onToggleSetting}>
      <Settings />
    </ButtonInHeader>
  );
};

export default SettingButton;