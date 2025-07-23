import { ref, onUnmounted, type Ref } from 'vue'
import { useLocalStorage } from './useLocalStorage.ts'

const COMMIT_DELAY_MS = 3000

export interface GameState {
  team1Score: number
  team2Score: number
}

interface HistoryManagement {
  history: Ref<GameState[]>
  redoHistory: Ref<GameState[]>
  showUndo: Ref<boolean>
  showRedo: Ref<boolean>
  recordStateChange: (team1Score: number, team2Score: number, onScoreUpdate: () => void) => void
  undoLastChange: (team1Score: number, team2Score: number, onStateRestore: (state: GameState) => void) => void
  redoLastChange: (team1Score: number, team2Score: number, onStateRestore: (state: GameState) => void) => void
  resetHistory: () => void
}

export function useHistoryManagement(): HistoryManagement {
  const [history, setHistory] = useLocalStorage<GameState[]>('history', [])
  const [redoHistory, setRedoHistory] = useLocalStorage<GameState[]>('redoHistory', [])
  const [showUndo, setShowUndo] = useLocalStorage<boolean>('showUndo', false)
  const [showRedo, setShowRedo] = useLocalStorage<boolean>('showRedo', false)
  
  const commitTimeoutRef = ref<number | null>(null)
  const hasPendingChanges = ref<boolean>(false)

  const createStateSnapshot = (team1Score: number, team2Score: number): GameState => ({
    team1Score,
    team2Score
  })

  const clearPendingCommit = (): void => {
    if (commitTimeoutRef.value) {
      clearTimeout(commitTimeoutRef.value)
      commitTimeoutRef.value = null
    }
  }

  const scheduleCommit = (): void => {
    clearPendingCommit()
    commitTimeoutRef.value = window.setTimeout(() => {
      hasPendingChanges.value = false
    }, COMMIT_DELAY_MS)
  }

  const recordStateChange = (team1Score: number, team2Score: number, onScoreUpdate: () => void): void => {
    if (showRedo.value) {
      setRedoHistory([])
    }

    if (!hasPendingChanges.value) {
      const currentState = createStateSnapshot(team1Score, team2Score)
      setHistory([...history.value, currentState])
      setShowUndo(true)
      hasPendingChanges.value = true
    }

    onScoreUpdate()
    scheduleCommit()
  }

  const undoLastChange = (team1Score: number, team2Score: number, onStateRestore: (state: GameState) => void): void => {
    if (history.value.length === 0) return

    const currentState = createStateSnapshot(team1Score, team2Score)
    setRedoHistory([...redoHistory.value, currentState])
    
    const previousState = history.value[history.value.length - 1]
    setHistory(history.value.slice(0, -1))
    setShowRedo(true)
    
    hasPendingChanges.value = false
    clearPendingCommit()
    
    onStateRestore(previousState)
  }

  const redoLastChange = (team1Score: number, team2Score: number, onStateRestore: (state: GameState) => void): void => {
    if (redoHistory.value.length === 0) return

    const currentState = createStateSnapshot(team1Score, team2Score)
    setHistory([...history.value, currentState])
    
    const redoState = redoHistory.value[redoHistory.value.length - 1]
    const newRedoHistory = redoHistory.value.slice(0, -1)
    setRedoHistory(newRedoHistory)
    setShowUndo(true)
    
    onStateRestore(redoState)
  }

  const resetHistory = (): void => {
    setHistory([])
    setRedoHistory([])
    setShowUndo(false)
    setShowRedo(false)
    hasPendingChanges.value = false
    clearPendingCommit()
  }

  onUnmounted(() => {
    clearPendingCommit()
  })

  return {
    history,
    redoHistory,
    showUndo,
    showRedo,
    recordStateChange,
    undoLastChange,
    redoLastChange,
    resetHistory
  }
} 