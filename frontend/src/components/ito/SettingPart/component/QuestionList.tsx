import React from 'react';
import { Box, Divider } from '@material-ui/core';
import { SingleThemeQuestion } from 'common-types';
import IntlFormattedMessage from 'components/ito/Common/components/intl/IntlFormattedMessage';
import ThemeQuestion from 'components/ito/GamePart/components/Playing/ThemeQuestion';

export interface QuestionListProps {
  questionListData: SingleThemeQuestion[]
}

const QuestionList = (props: QuestionListProps) => {
  return (
    <Box>
      <IntlFormattedMessage
        align={'center'}
        variant={'h6'}
        langKey={'questionList.title'}
      />
      <Divider />
      <Box paddingTop={1}>
        {props.questionListData.map((q, i) => (
          <ThemeQuestion 
            key={i}
            {...q}
            question={q.content}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestionList;