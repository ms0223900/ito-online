
import ContextStore from 'constants/context';
import useToggle from 'lib/custom-hooks/useToggle';
import { useContext } from 'react';

const useHeader = () => {
  const {
    state: { user, },
  } = useContext(ContextStore);
  
  const {
    toggle: hintToggle,
    handleToggle: handleToggleHint,
  } = useToggle();
  const {
    toggle: settingToggle,
    handleToggle: handleToggleSetting,
  } = useToggle();

  return ({
    hintToggle,
    settingToggle,
    handleToggleHint,
    handleToggleSetting,
    user,
  });
};

export default useHeader;