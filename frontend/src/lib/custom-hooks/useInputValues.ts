import { useCallback, useEffect, useState } from "react";

export interface UseInputValuesOptions<Key extends string> {
  initValues: Record<Key, string>
  onValueChanged?: (values: Record<Key, string>) => any
}
type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

function useInputValues<Key extends string>({
  initValues, onValueChanged,
}: UseInputValuesOptions<Key>) {
  const [values, setVals] = useState(initValues);

  const handleClearInput = useCallback((key: Key) => () => {
    setVals(v => ({
      ...v,
      [key]: '',
    }));
  }, []);

  const handleClearAllValues = useCallback(() => {
    setVals(initValues);
  }, []);

  const handleChangeValue = useCallback((key: Key) => (e: Event) => {
    setVals(v => ({
      ...v,
      [key]: e.target.value,
    }));
  }, []);

  useEffect(() => {
    onValueChanged && onValueChanged(values);
  }, [JSON.stringify(values)]);

  return ({
    values,
    handleChangeValue,
    handleClearAllValues,
    handleClearInput,
  });
};

export default useInputValues;