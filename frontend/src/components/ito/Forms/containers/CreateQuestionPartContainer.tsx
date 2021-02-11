import React from 'react';
import { Box } from '@material-ui/core';
import CreateQuestionPart from '../components/CreateQuestionPart';
import useCreateQuestionPart from './functions/useCreateQuestionPart';

const CreateQuestionPartContainer = () => {
  const {
    toggleDisplayQuestions,
    loading,
    isAvailableCreate,
    values,
    handleChangeValue,
    handleConfirmCreateQuestion,
    handleToggleDisplayQuestions,
  } = useCreateQuestionPart();

  return (
    <CreateQuestionPart
      loading={loading}
      toggleDisplayQuestions={toggleDisplayQuestions}
      createDisabled={!isAvailableCreate}
      values={values}
      onValuesChange={handleChangeValue}
      onCreateQuestion={handleConfirmCreateQuestion}
      onToggleDisplayQuestions={handleToggleDisplayQuestions}
    />
  );
};

export default CreateQuestionPartContainer;