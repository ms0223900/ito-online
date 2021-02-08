import React from 'react';
import { Box } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import { useIntl } from 'react-intl';
import gameManual from 'static/gameManual';

const GameManual = () => {
  const { locale, } = useIntl();
  
  return (
    <Box>
      <ReactMarkdown
        source={locale === 'en' ? gameManual.en : gameManual.zh}
      />
    </Box>
  );
};

export default GameManual;