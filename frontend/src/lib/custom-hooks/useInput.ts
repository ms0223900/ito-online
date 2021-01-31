import { useCallback, useEffect, useState } from "react";

export interface UseInputOptions {
  initValue?: string
  onValueChanged?: (value: string) => any
}

const useInput = ({
  initValue='',
  onValueChanged,
}: UseInputOptions) => {
  const [value, setVal] = useState(initValue);

  const handleChangeInput = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setVal(event.target.value);
  }, []);

  const handleClearInput = () => {
    setVal('');
  };

  useEffect(() => {
    onValueChanged && onValueChanged(value);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return ({
    value,
    setVal,
    handleChangeInput,
    handleClearInput,
  });
};

export default useInput;