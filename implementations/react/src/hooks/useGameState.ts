import useLocalStorage from './useLocalStorage';

interface HistoryState {
  team1Score: number;
  team2Score: number;
}

const STORAGE_KEYS = {
  TEAM1_NAME: 'team1Name',
  TEAM2_NAME: 'team2Name',
  TEAM1_SCORE: 'team1Score',
  TEAM2_SCORE: 'team2Score',
  HISTORY: 'history',
  SHOW_UNDO: 'showUndo',
  SHOW_REDO: 'showRedo',
  REDO_HISTORY: 'redoHistory'
} as const;

const DEFAULT_VALUES = {
  TEAM_NAME_1: 'Team 1' as string,
  TEAM_NAME_2: 'Team 2' as string,
  SCORE: 0 as number,
  HISTORY: [] as HistoryState[],
  SHOW_UNDO: false as boolean,
  SHOW_REDO: false as boolean,
  REDO_HISTORY: [] as HistoryState[]
};

function useGameState() {
  const [team1Name, setTeam1Name] = useLocalStorage(STORAGE_KEYS.TEAM1_NAME, DEFAULT_VALUES.TEAM_NAME_1);
  const [team2Name, setTeam2Name] = useLocalStorage(STORAGE_KEYS.TEAM2_NAME, DEFAULT_VALUES.TEAM_NAME_2);
  const [team1Score, setTeam1Score] = useLocalStorage(STORAGE_KEYS.TEAM1_SCORE, DEFAULT_VALUES.SCORE);
  const [team2Score, setTeam2Score] = useLocalStorage(STORAGE_KEYS.TEAM2_SCORE, DEFAULT_VALUES.SCORE);
  const [history, setHistory] = useLocalStorage<HistoryState[]>(STORAGE_KEYS.HISTORY, DEFAULT_VALUES.HISTORY);
  const [showUndo, setShowUndo] = useLocalStorage(STORAGE_KEYS.SHOW_UNDO, DEFAULT_VALUES.SHOW_UNDO);
  const [showRedo, setShowRedo] = useLocalStorage(STORAGE_KEYS.SHOW_REDO, DEFAULT_VALUES.SHOW_REDO);
  const [redoHistory, setRedoHistory] = useLocalStorage<HistoryState[]>(STORAGE_KEYS.REDO_HISTORY, DEFAULT_VALUES.REDO_HISTORY);

  return {
    gameState: {
      team1Name,
      team2Name,
      team1Score,
      team2Score,
      history,
      showUndo,
      showRedo,
      redoHistory
    },
    setGameState: {
      setTeam1Name,
      setTeam2Name,
      setTeam1Score,
      setTeam2Score,
      setHistory,
      setShowUndo,
      setShowRedo,
      setRedoHistory
    }
  };
}

export default useGameState;
export type { HistoryState }; 