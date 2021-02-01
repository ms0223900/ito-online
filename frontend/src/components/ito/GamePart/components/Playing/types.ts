import { Callback } from "common-types";
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

export interface PlayedResultProps {
  resultPayload?: {
    prevCardNumber: number
    nextCardNumber: number
    result: 'FAIL' | 'SUCCESS'
  }
  isResultOpen: boolean
  onCloseResult: Callback
}

export interface PlayingPartProps extends ThemeQuestionProps, PlayAreaProps, LifeListProps, PlayedResultProps {
  
}