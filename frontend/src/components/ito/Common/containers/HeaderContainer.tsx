import React, { useContext } from 'react';
import Header from '../components/Header';
import ContextStore from 'constants/context';
import useHeader from './functions/useHeader';

const HeaderContainer = () => {
  const {
    user,
    handleToggleHint,
    handleToggleSetting,
  } = useHeader();
  
  return (
    <Header 
      user={user} 
      onToggleHint={handleToggleHint }
      onToggleSetting={handleToggleSetting} 
    />
  );
};

export default HeaderContainer;