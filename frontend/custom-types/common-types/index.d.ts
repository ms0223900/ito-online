

declare module "common-types" {
  import { ThemeQuestionProps } from "components/ito/GamePart/components/Playing/types";
  
  type Callback = (...args: any[]) => any;
  
  interface SingleUser {
    id: string
    name?: string
    isReady?: boolean
  }

  interface SingleRoom {
    id: string
    name?: string
    users: SingleUser[]
  }

  interface GameStatus {
    READY: string
    START: string
    CONTINUED: string
    PASS: string
    OVER: string
    ERROR: string

    UPDATE_READY: string
    ADD_PLAYER: string
    REMOVE_PLAYER: string
  }
  type GameStatusKeys = keyof GameStatus

  export type PlayedResultType = 'FAIL' | 'SUCCESS' | 'GAME_OVER'

  interface GameLifeStatus {
    lifeNow: number
    maxLife: number
  }
  interface GamePlayingStatus {
    question: ThemeQuestionProps
    isPlaying: boolean
    life: GameLifeStatus
    latestCard: number
    myCardNow: number | null
  }
}