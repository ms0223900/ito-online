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

export interface CreateQuestionPartProps extends BasicFormProps {
  onCreateQuestion: Callback
}
