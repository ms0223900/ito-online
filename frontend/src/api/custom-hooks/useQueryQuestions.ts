import { SingleRoom, SingleThemeQuestion } from "common-types";
import { QUERY_QUESTIONS_URI } from "constants/API";
import useFetch from "lib/custom-hooks/useFetch";
import { useEffect } from "react";

const useQueryQuestions = () => {
  const fetched = useFetch<SingleThemeQuestion[]>({
    apiPath: QUERY_QUESTIONS_URI,
    initResponseData: [],
  });

  useEffect(() => {
    fetched.fetchData();
  }, []);

  return ({
    ...fetched,
    questions: fetched.responseData,
  });
};

export default useQueryQuestions;