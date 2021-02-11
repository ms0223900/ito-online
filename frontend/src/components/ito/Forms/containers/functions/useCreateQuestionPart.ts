import { CREATE_QUESTION_URI } from "constants/API";
import useFetch from "lib/custom-hooks/useFetch";
import useInputValues from "lib/custom-hooks/useInputValues";
import useToggle from "lib/custom-hooks/useToggle";
import { useCallback, useEffect } from "react";
import { useIntl } from "react-intl";
import { QuestionInputKey } from "../../components/types";


const useCreateQuestionPart = () => {
  const {
    messages,
  } = useIntl();
  const {
    values,
    handleChangeValue,
    handleClearAllValues,
  } = useInputValues<QuestionInputKey>({
    initValues: {
      QUESTION: '',
      SUPPLEMENT: '',
    }
  });
  const {
    toggle: toggleDisplayQuestions,
    handleToggle: handleToggleDisplayQuestions,
  } = useToggle();
  const fetched = useFetch({
    apiPath: CREATE_QUESTION_URI,
    initResponseData: undefined,
    isPostMethod: true,
  });
  
  const handleConfirmCreateQuestion = useCallback(() => {
    try {
      if(values.QUESTION && values.SUPPLEMENT) {
        const postForm = {
          type: 'CREATE',
          content: values.QUESTION,
          supplement: values.SUPPLEMENT,
        };
        fetched.fetchData({
          postForm,
        });
      }
    } catch (error) {
      window.alert(`${messages['createQuestionPart.result.fail']}(${error})`);
    }
  }, [values.QUESTION, values.SUPPLEMENT]);

  useEffect(() => {
    if(fetched.responseData) {
      window.alert(messages['createQuestionPart.result.success']);
      handleClearAllValues();
    }
  }, [fetched.responseData]);

  useEffect(() => {
    fetched.error && window.alert(fetched.error);
  }, [fetched.error]);

  const isAvailableCreate = values.QUESTION && values.SUPPLEMENT;

  return ({
    toggleDisplayQuestions,
    loading: fetched.loading,
    isAvailableCreate,
    values,
    handleChangeValue,
    handleConfirmCreateQuestion,
    handleToggleDisplayQuestions,
  });
};

export default useCreateQuestionPart;