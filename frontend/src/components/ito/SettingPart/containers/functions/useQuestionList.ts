import useQueryQuestions from "api/custom-hooks/useQueryQuestions";

const useQuestionList = () => {
  const {
    loading,
    questions,
  } = useQueryQuestions();

  return ({
    loading,
    questions,
  });
};

export default useQuestionList;