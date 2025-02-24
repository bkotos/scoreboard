import { useScore } from './use-score';
import { useState } from 'react';

interface GameScore {
    team1?: number;
    team2?: number;
}

export const useGameEngine = () => {
    const [cursor, setCursor] = useState<number>(0);
    const moveCursorToEnd = () => setCursor(history.length - 1);
    const moveCursorBackOne = () => {
        const newCursor = cursor - 1;
        setCursor(newCursor);
        return newCursor;
    };
    const moveCursorForwardOne = () => {
        const newCursor = cursor + 1;
        setCursor(newCursor);
        return newCursor;
    };

    const [isCached, setIsCached] = useState<boolean>(false)
    const flushCache = () => {
        clearTimer()
        setIsCached(false)
    }

    const [history, setHistory] = useState<GameScore[]>([{ team1: 0, team2: 0 }]);
    const getLastHistoryItem = () => history[history.length - 1]
    const getHistoryWithoutUndoneItems = () => history.slice(0, cursor + 1)
    const pushHistory = (score: GameScore) => {
        const history = getHistoryWithoutUndoneItems()
        setHistory([...history, score]);
    }
    const updateLastHistoryItem = (score: GameScore) => {
        const updatedHistory = history.map((currentHistoryItem, i) => {
            const isLast = i === history.length - 1
            return isLast ? score : currentHistoryItem
        })
        setHistory(updatedHistory)
    }
    const setCachedHistoryItem = (team: keyof GameScore, value: number) => {
        const updatedHistoryItem: GameScore = {
            ...getLastHistoryItem(),
            [team]: value,
        }
        if (isCached) updateLastHistoryItem(updatedHistoryItem)
        else pushHistory(updatedHistoryItem)

        setIsCached(true)
    }

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const clearTimer = () => clearTimeout(timer)
    const onNoActivityFor3Seconds = () => {
        moveCursorToEnd();
        setIsCached(false)
    }
    const pushTimerOutBy3Seconds = () => {
        clearTimer();
        setTimer(setTimeout(onNoActivityFor3Seconds, 3000));
    }

    const updateGameHistory = (team: keyof GameScore, value: number) => {
        setCachedHistoryItem(team, value)
        pushTimerOutBy3Seconds()
    };

    const team1Score = useScore({
        onChange: (value) => updateGameHistory('team1', value)
    });

    const team2Score = useScore({
        onChange: (value) => updateGameHistory('team2', value)
    });

    const getPreviousValues = () => {
        const newCursor = isCached ? cursor : moveCursorBackOne()
        return history[newCursor];
    };

    const getNextValues = () => {
        const newCursor = moveCursorForwardOne();
        return history[newCursor];
    };

    const undo = () => {
        const previousValues = getPreviousValues();
        team1Score.setValue(previousValues.team1);
        team2Score.setValue(previousValues.team2);
        flushCache()
    };

    const redo = () => {
        const nextValues = getNextValues();
        team1Score.setValue(nextValues.team1);
        team2Score.setValue(nextValues.team2);
        flushCache()
    };

    const isAtFrontOfHistory = history.slice(0, cursor).length === 0;
    const isAtEndOfHistory = cursor === (history.length - 1);

    return {
        undo, redo, isAtFrontOfHistory, isAtEndOfHistory, team1Score, team2Score, hasCachedHistoryItem: () => isCached
    };
};
