

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
    READY: 'READY'
    START: 'START'
    CONTINUED: 'CONTINUED'
    PASS: 'PASS'
    OVER: 'OVER'
    ERROR: 'ERROR'

    UPDATE_READY: 'UPDATE_READY'
    ADD_PLAYER: 'ADD_PLAYER'
    REMOVE_PLAYER: 'REMOVE_PLAYER'
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

  interface SinglePlayerCardAndQuestion {
    player: SingleUser
    question: { content: string }
    life: GameLifeStatus
    card: number
    latestCard: number
  }
  interface SuccessGamePlayingStatusPayload {
    gameStatus: GameStatus['START']
    message: string
    playerCardAndQuestionList: SinglePlayerCardAndQuestion[]
  }
  interface FailedGamePlayingStatusPayload {
    gameStatus: GameStatus['ERROR']
    message: string
  }

  type GamePlayingStatusFromSocketPayload = 
    SuccessGamePlayingStatusPayload |
    FailedGamePlayingStatusPayload
}