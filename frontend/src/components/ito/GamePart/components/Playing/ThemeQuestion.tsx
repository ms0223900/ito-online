import React from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { ThemeQuestionProps } from './types';

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
      <Typography>
        {props.supplement}
      </Typography>
    </Paper>
  );
};

export default ThemeQuestion;