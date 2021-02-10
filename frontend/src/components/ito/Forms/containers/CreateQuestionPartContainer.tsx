import React from 'react';
import { Box } from '@material-ui/core';
import CreateQuestionPart from '../components/CreateQuestionPart';
import useCreateQuestionPart from './functions/useCreateQuestionPart';

const CreateQuestionPartContainer = () => {
  const {
    isAvailableCreate,
    values,
    handleChangeValue,
    handleConfirmCreateQuestion,
  } = useCreateQuestionPart();

  return (
    <CreateQuestionPart
      createDisabled={!isAvailableCreate}
      values={values}
      onValuesChange={handleChangeValue}
      onCreateQuestion={handleConfirmCreateQuestion}
    />
  );
};

export default CreateQuestionPartContainer;