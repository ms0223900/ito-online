import React from 'react';
import { Box, Button, Divider, Grid, makeStyles, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import { CreateQuestionPartProps } from './types';
import CTAButton from 'components/ito/Common/components/CTAButton';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';
import { useIntl } from 'react-intl';

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
  loading,
  createDisabled,
  values,
  onValuesChange,
  onCreateQuestion,
}: CreateQuestionPartProps) => {
  const classes = useStyles();
  const { messages } = useIntl();

  return (
    <Box className={classes.root}>
      <Box paddingBottom={2}>
        <Box paddingBottom={2}>
          <IntlFormattedMessage 
            align={'center'} 
            variant={'h5'}
            langKey={'createQuestionPart.title'}
          />
          <IntlFormattedMessage 
            langKey={'createQuestionPart.desc'}
          />
        </Box>
        <Box paddingY={1}>
          <TextareaAutosize
            className={classes.textArea}
            placeholder={messages['createQuestionPart.questionInput.placeholder'] as any}
            autoFocus={true}
            rowsMin={4}
            value={values['QUESTION']}
            onChange={onValuesChange('QUESTION')}
          />
        </Box>
        <Grid container alignItems={'center'}>
          <Grid item xs={4}>
            <IntlFormattedMessage 
              variant={'h6'}
              langKey={'createQuestionPart.supplementInput.prefix'}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              placeholder={messages['createQuestionPart.supplementInput.placeholder'] as any}
              variant={'outlined'}
              fullWidth={true}
              value={values['SUPPLEMENT']}
              onChange={onValuesChange('SUPPLEMENT')}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <CTAButton 
        disabled={loading || createDisabled} 
        onClick={onCreateQuestion}
      >
        {loading ? (
          <IntlFormattedMessage 
            langKey={'createQuestionPart.creating'}
          />
        ) : (
          <IntlFormattedMessage 
            langKey={'createQuestionPart.confirmCreate'}
          />
        )}
      </CTAButton>
    </Box>
  );
};

export default CreateQuestionPart;