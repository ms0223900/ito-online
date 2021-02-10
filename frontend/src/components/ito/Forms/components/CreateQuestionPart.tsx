import React from 'react';
import { Box, Button, Divider, Grid, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { CreateQuestionPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    whiteSpace: 'pre-wrap',
    // textAlign: 'center',
  },
  textArea: {
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    maxWidth: '100%',
    borderRadius: theme.spacing(1),
    fontSize: 24,
    resize: 'none',
  },
  input: {
    padding: theme.spacing(1),
  }
}));

const CreateQuestionPart = ({
  createDisabled,
  values,
  onValuesChange,
  onCreateQuestion,
}: CreateQuestionPartProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box paddingBottom={2}>
        <Box paddingBottom={2}>
          <Typography align={'center'} variant={'h5'}>{'Create Theme Question'}</Typography>
          <Typography>
            {'建立主題問題，內容須為某種領域的程度。\n例如: 食物的臭度、海賊王角色的強度、小吃的美味程度...等'}
          </Typography>
        </Box>
        <Box paddingY={1}>
          <TextareaAutosize
            className={classes.textArea}
            placeholder={'填寫主題題目'}
            autoFocus={true}
            rowsMin={4}
            value={values['QUESTION']}
            onChange={onValuesChange('QUESTION')}
          />
        </Box>
        <Grid container alignItems={'center'}>
          <Grid item xs={4}>
            <Typography variant={'h6'}>
              {'數字越大，則越'}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              placeholder={'輸入程度形容詞（例如強大、難受、開心...等）'}
              variant={'outlined'}
              fullWidth={true}
              value={values['SUPPLEMENT']}
              onChange={onValuesChange('SUPPLEMENT')}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CTAButton disabled={createDisabled} onClick={onCreateQuestion}>
        {'Create Question'}
      </CTAButton>
    </Box>
  );
};

export default CreateQuestionPart;