import React from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { FailSuccessResultProps } from './types';
import { PlayedResultType } from 'common-types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#fff',
  }
}));

const getOperator = (resultType: PlayedResultType) => (
  resultType === 'SUCCESS' ? ' < ' : ' > '
);

const FailSuccessResult = (props: FailSuccessResultProps) => {
  const {
    resultType,
    prevCardNumber,
    nextCardNumber,
    onConfirmResult,
  } = props;
  const classes = useStyles();

  return (
    <Box textAlign={'center'} className={classes.root}>
      <Typography variant={'h5'}>
        {(!prevCardNumber || prevCardNumber === Infinity) ? 
          nextCardNumber :
          `${nextCardNumber}${getOperator(resultType)}${prevCardNumber}`}
      </Typography>
      <Typography variant={'h4'}>{resultType}</Typography> 
      <CTAButton color={'default'} onClick={onConfirmResult}>
        {resultType === 'SUCCESS' ? (
          <IntlFormattedMessage langKey={'playingPart.failSuccessResult.success'} />
        ) : (
          <IntlFormattedMessage langKey={'playingPart.failSuccessResult.fail'} />
        )}
      </CTAButton>             
    </Box>
  );
};

export default FailSuccessResult;