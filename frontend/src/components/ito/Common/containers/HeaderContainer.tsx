import React, { useCallback, useContext } from 'react';
import { Box } from '@material-ui/core';
import Header from '../components/Header';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ItoSocket from 'constants/itoSocket';
import ROUTES, { RouterParams } from 'constants/ROUTES';
import ContextStore, { initItoState } from 'constants/context';

const HeaderContainer = () => {
  const {
    state: { user, },
  } = useContext(ContextStore);
  
  return (
    <Header user={user} />
  );
};

export default HeaderContainer;