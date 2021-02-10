import useInputValues from "lib/custom-hooks/useInputValues";
import { useCallback } from "react";
import { QuestionInputKey } from "../../components/types";


const useCreateQuestionPart = () => {
  const {
    values,
    handleChangeValue,
  } = useInputValues<QuestionInputKey>({
    initValues: {
      QUESTION: '',
      SUPPLEMENT: '',
    }
  });
  
  const handleConfirmCreateQuestion = useCallback(() => {
    
  }, []);

  return ({
    values,
    handleChangeValue,
    handleConfirmCreateQuestion,
  });
};

export default useCreateQuestionPart;