import React from 'react';
import { Box } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { useIntl } from 'react-intl';
import gameManual from 'static/gameManual';
import ModalWrapper, { ModalWrapperProps } from 'components/ito/Common/components/wrappers/ModalWrapper';
import { Callback } from 'common-types';

export interface GameManualProps extends Omit<ModalWrapperProps, 'children'> {
  onCloseManual: Callback
}

const GameManual = (props: GameManualProps) => {
  const { locale, } = useIntl();
  
  return (
    <ModalWrapper onClose={props.onCloseManual} {...props}>
      <Box>
        <ReactMarkdown
          source={locale === 'en' ? gameManual.en : gameManual.zh}
        />
      </Box>
    </ModalWrapper>
  );
};

export default GameManual;