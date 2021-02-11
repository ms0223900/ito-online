import React from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ThemeQuestionProps } from './types';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
}));

const ThemeQuestion = (props: ThemeQuestionProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant={'h5'}>
        {props.question}
      </Typography>
      <IntlFormattedMessage 
        langKey={'playingPart.playArea.supplement'}
        values={{
          supplement: props.supplement,
        }}
      />
    </Paper>
  );
};

export default ThemeQuestion;