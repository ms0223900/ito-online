import React, { ReactNode } from 'react';
import { Box, Button, makeStyles, Modal, ModalProps, Paper } from '@material-ui/core';
import { Close } from '@material-ui/icons';

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
    position: 'relative',
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    width: 600,
    maxWidth: '100%',
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
        <Button
          onClick={props.onClose as any}
          style={{
            position: 'absolute', top: 0, right: 0, zIndex: 10,
          }}
        >
          <Close />
        </Button>
        {props.children}
      </Paper>
    </Modal>
  );
};

export default ModalWrapper;