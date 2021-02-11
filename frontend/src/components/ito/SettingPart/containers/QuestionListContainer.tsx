import React from 'react';
import { Box } from '@material-ui/core';
import QuestionList from '../component/QuestionList';
import useQuestionList from './functions/useQuestionList';
import LoadingErrorMessageWrapper from 'components/ito/Common/components/wrappers/LoadingErrorEmptyMessageWrapper';

const QuestionListContainer = () => {
  const {
    loading,
    questions,
  } = useQuestionList();

  return (
    <LoadingErrorMessageWrapper
      loading={loading}
    >
      <QuestionList
        questionListData={questions}
      />
    </LoadingErrorMessageWrapper>
  );
};

export default QuestionListContainer;