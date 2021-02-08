import React, { useContext } from 'react';
import Header from '../components/Header';
import ContextStore from 'constants/context';
import useHeader from './functions/useHeader';
import GameManual from 'components/ito/SettingPart/component/GameManual';

const HeaderContainer = () => {
  const {
    user,
    hintToggle,
    handleToggleHint,
    handleToggleSetting,
  } = useHeader();
  
  return (
    <>
      <Header 
        user={user} 
        onToggleHint={handleToggleHint }
        onToggleSetting={handleToggleSetting} 
      />
      <GameManual open={hintToggle} onCloseManual={handleToggleHint} />
    </>
  );
};

export default HeaderContainer;