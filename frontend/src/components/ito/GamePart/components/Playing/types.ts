import { Callback, PlayedResultType } from "common-types";
import { LifeListProps } from "../types";

export interface PlayedResultPayload {
  prevCardNumber: number
  nextCardNumber: number
  passedRounds: number
  resultType: PlayedResultType
}

export interface ThemeQuestionProps {
  question: string
  supplement: string
}

export interface PlayAreaProps {
  latestCardNumber: number | null
  cardNumberNow: number | null
  onPlayCard: Callback
}

export interface FailSuccessResultProps extends PlayedResultPayload {
  onConfirmResult: Callback
}

export interface PassedRoundsInfoProps extends Pick<PlayedResultPayload, 'passedRounds'> {
}
export interface ContinuedResultProps extends PassedRoundsInfoProps {
  isContinuedFailed?: boolean
  isConfirmed: boolean
  onContinue: Callback
  onOverGame: Callback
}
export interface GameoverResultProps extends Omit<ContinuedResultProps, 'onContinue'> {
  
}

export interface PlayedResultProps extends Omit<ContinuedResultProps, 'passedRounds'> {
  resultPayload?: PlayedResultPayload
  isResultOpen: boolean
  onCloseResult: Callback
}

export interface PlayingPartProps extends ThemeQuestionProps, PlayAreaProps, LifeListProps, PlayedResultProps {
  
}