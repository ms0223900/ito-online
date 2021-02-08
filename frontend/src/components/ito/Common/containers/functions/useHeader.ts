
import ContextStore from 'constants/context';
import useToggle from 'lib/custom-hooks/useToggle';
import { useContext } from 'react';

const useHeader = () => {
  const {
    state: { user, },
  } = useContext(ContextStore);
  
  const {
    handleToggle: handleToggleHint,
  } = useToggle();
  const {
    handleToggle: handleToggleSetting,
  } = useToggle();

  return ({
    handleToggleHint,
    handleToggleSetting,
    user,
  });
};

export default useHeader;