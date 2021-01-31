import React from 'react';
import { Box, Button, makeStyles, TextareaAutosize, Typography } from '@material-ui/core';
import { CreateQuestionPartProps } from './types';

const useStyles = makeStyles(theme => ({
  root: {
     
  },
  input: {
    padding: theme.spacing(1),
  }
}));

const CreateQuestionPart = (props: CreateQuestionPartProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography>{'Create Theme Question'}</Typography>
      <Box>
        {'建立有關某個主題的程度。\n例如: 食物的臭度、海賊王角色的強度、小吃的美味程度...等'}
      </Box>
      <TextareaAutosize
        className={classes.input}
        rowsMin={3}
        value={props.value}
        onChange={props.onChange}
      />
      <hr />
      <Button onClick={props.onCreateQuestion}>
        {'Create Question'}
      </Button>
    </Box>
  );
};

export default CreateQuestionPart;