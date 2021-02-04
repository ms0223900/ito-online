import { Callback, PlayedResultType } from "common-types";
import { LifeListProps } from "../types";

export interface ThemeQuestionProps {
  question: string
  supplement?: string
}

export interface PlayAreaProps {
  latestCardNumber: number
  cardNumberNow: number | null
  onPlayCard: Callback
}

export interface PlayedResultPayload {
  prevCardNumber: number
  nextCardNumber: number
  result: PlayedResultType
}
export interface FailSuccessResultProps extends PlayedResultPayload {
  
}

export interface PlayedResultProps {
  resultType: PlayedResultType
  resultPayload?: PlayedResultPayload
  isResultOpen: boolean
  onCloseResult: Callback
}

export interface PlayingPartProps extends ThemeQuestionProps, PlayAreaProps, LifeListProps, PlayedResultProps {
  
}