import React from 'react';
import { Box, Typography, TypographyProps, makeStyles, Theme } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { localeKeys, LocaleKeys, langs } from 'locale/locale';


export interface IntlFormattedMessageProps<Values> extends TypographyProps {
  values?: Values
  langKey: LocaleKeys
}

const useStyles = makeStyles<Theme, IntlFormattedMessageProps<any>>(theme => ({
  root: {
    color: props => props.color === 'primary' ? theme.palette.primary.dark : props.color,
    whiteSpace: 'pre-wrap',
  }
}));

function IntlFormattedMessage<Values extends Record<string, any>>(props: IntlFormattedMessageProps<Values>) {
  const {
    values,
    langKey,
    variant,
  } = props;
  const classes = useStyles(props);
  
  return (
    <>
      <FormattedMessage<Values> 
        id={localeKeys[langKey]}
        defaultMessage={langs.zh[langKey]}
        values={values}>
        {txt => (
          <Typography
            className={classes.root}
            {...props}
            variant={variant}
          >
            {txt}
          </Typography>
        )}
      </FormattedMessage>
    </>
  );
}

export default IntlFormattedMessage;