import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import Header from '../components/Header';
import { useHistory, useParams, useRouteMatch } from 'react-router';
import ItoSocket from 'constants/itoSocket';
import ROUTES, { RouterParams } from 'constants/ROUTES';
import { initItoState } from 'constants/context';

const HeaderContainer = () => {
  return (
    <Header />
  );
};

export default HeaderContainer;