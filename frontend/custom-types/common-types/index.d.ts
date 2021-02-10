

declare module "common-types" {
  import { ThemeQuestionProps } from "components/ito/GamePart/components/Playing/types";
  
  type Locale = 'zh' | 'en'
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

  export type PlayedResultType = 
    'FAIL' | // 此比較失敗(還沒結束)
    'SUCCESS' | // 此比較成功(還沒結束)
    'GAME_OVER' | // 遊戲結束
    'CONTINUED' | // 繼續下一輪
    'CONTINUED_FAILED' // 繼續失敗（人數不足）

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

  interface SingleThemeQuestion {
    content: string
    supplement: string
  }

  interface SinglePlayerCardAndQuestion {
    player: SingleUser
    question: SingleThemeQuestion
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

  interface ComparedPlayedResult { //比較完的結果
    user: SingleUser
    prevCard: number
    latestCard: number 
    latestLife: number
  }
}