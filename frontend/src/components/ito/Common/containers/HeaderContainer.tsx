import React, { useContext } from 'react';
import Header from '../components/Header';
import ContextStore from 'constants/context';

const HeaderContainer = () => {
  const {
    state: { user, },
  } = useContext(ContextStore);
  
  return (
    <Header user={user} onToggleSetting={() => {}} />
  );
};

export default HeaderContainer;