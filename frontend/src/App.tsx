import React, {  } from 'react';
import { Switch, Route } from 'react-router-dom';

import { io } from 'socket.io-client';
import { API_URI } from './constants/API';
import { Container, makeStyles } from '@material-ui/core';
import ROUTES from 'constants/ROUTES';
import RoomPartContainer from 'components/ito/RoomPart/containers/RoomPartContainer';
import CreateRoomPartContainer from 'components/ito/Forms/containers/CreateRoomPartContainer';
import WaitingRoomPartContainer from 'components/ito/RoomPart/containers/WaitingRoom/WaitingRoomPartContainer';
import HeaderContainer from 'components/ito/Common/containers/HeaderContainer';
import PlayingPartContainer from 'components/ito/GamePart/containers/Playing/PlayingPartContainer';
import { IntlProvider } from 'react-intl';
import CreateQuestionPartContainer from 'components/ito/Forms/containers/CreateQuestionPartContainer';
import useLocale from 'locale/locale';

export const socket = io(API_URI);

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    maxWidth: 500,
    height: '100%',
    minHeight: '100vh',
    
  },

}));

function App() {
  const classes = useStyles();
  const {
    locale, messages,
  } = useLocale();

  return (
    <IntlProvider locale={locale} messages={messages}>
      <HeaderContainer />
      <Container className={classes.root}>
        <Switch>
          <Route
            exact
            path={ROUTES.homepage}
            component={RoomPartContainer}
          />
          <Route 
            path={ROUTES.rooms}
            component={RoomPartContainer}
          />
          <Route 
            path={ROUTES.room}
            component={WaitingRoomPartContainer}
          />
          <Route 
            path={ROUTES.playing}
            component={PlayingPartContainer}
          />
          <Route 
            path={ROUTES.createUser}
          />
          <Route 
            path={ROUTES.createQuestion}
            component={CreateQuestionPartContainer}
          />
          <Route 
            path={ROUTES.createRoom}
            component={CreateRoomPartContainer}
          />
        </Switch>
      </Container>
    </IntlProvider>
  );
}

export default App;
