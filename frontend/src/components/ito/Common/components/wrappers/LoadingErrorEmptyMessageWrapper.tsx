import React, { ReactNode } from 'react';
import LoadingAndError from '../others/LoadingAndError';
import { Box } from '@material-ui/core';
import EmptyMessage from '../others/EmptyMessage';

export interface LoadingErrorMessageWrapperProps {
  error?: any
  loading?: boolean
  isEmpty?: boolean
  emptyMessage?: ReactNode
  children?: ReactNode
}

const LoadingErrorMessageWrapper = (props: LoadingErrorMessageWrapperProps) => {
  const {
    loading, error, isEmpty, emptyMessage, children,
  } = props;

  if(loading || error)
    return (
      <LoadingAndError {...props} />
    );

  if(isEmpty)
    return (
      <EmptyMessage>
        {emptyMessage}
      </EmptyMessage>
    );

  if(children) 
    return <>{children}</>;

  return null;
};

export default LoadingErrorMessageWrapper;