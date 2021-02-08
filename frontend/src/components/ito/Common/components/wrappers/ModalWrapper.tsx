import React, { ReactNode } from 'react';
import { Box, makeStyles, Modal, ModalProps, Paper } from '@material-ui/core';

export interface ModalWrapperProps extends Omit<ModalProps, 'children'> {
  children: ReactNode
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    maxWidth: '60vw',
    maxHeight: '90vh',
    overflow: 'scroll',
  }
}));

const ModalWrapper = (props: ModalWrapperProps) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      {...props}
    >
      <Paper className={classes.content}>
        {props.children}
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;