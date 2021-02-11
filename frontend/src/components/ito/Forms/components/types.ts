import { TextFieldProps } from "@material-ui/core";
import { Callback } from "common-types";

export interface BasicFormProps {
  value: string
  onChange: TextFieldProps['onChange']
}

export interface CreateUserPartProps extends BasicFormProps {
  onCreateUser: Callback
}

export interface CreateRoomPartProps extends BasicFormProps {
  loading?: boolean
  onCreateRoom: Callback
}

export type QuestionInputKey = 'QUESTION' | 'SUPPLEMENT'
export interface CreateQuestionPartProps {
  loading: boolean
  createDisabled?: boolean
  values: Record<QuestionInputKey, string>
  onValuesChange: (key: QuestionInputKey) => TextFieldProps['onChange']
  onCreateQuestion: Callback
}
