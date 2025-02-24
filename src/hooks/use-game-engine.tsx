import { useScore } from './use-score';
import { useEffect, useState } from 'react';

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

    const [history, setHistory] = useState<GameScore[]>([{ team1: 0, team2: 0 }]);
    const pushHistory = (score: GameScore) => {
        const clonedHistory = history.slice(0, cursor + 1)
        setHistory([...clonedHistory, score]);
    }
    const setCachedHistoryItem = (historyItem: GameScore) => {
        const foo: GameScore = {
            team1: historyItem.team1 ?? history[cursor].team1,
            team2: historyItem.team2 ?? history[cursor].team2,
        }
        if (isCached) {
            const updatedHistory = history.map((row, i) => {
                if (i === history.length - 1) return foo
                else return row
            })
            setHistory(updatedHistory)
        }
        else {
            pushHistory(foo)
        }
    }
    const getCachedHistoryItem = () => ({
        team1: history[history.length - 1].team1 ?? 0,
        team2: history[history.length - 1].team2 ?? 0,
    });

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();

    const updateGameHistory = (team: keyof GameScore, value: number) => {
        setCachedHistoryItem({
            ...getCachedHistoryItem(),
            [team]: value
        });
        setIsCached(true)
        clearTimeout(timer);
        setTimer(setTimeout(() => {
            moveCursorToEnd();
            setIsCached(false)
        }, 3000));
    };

    const team1Score = useScore({
        onChange: (value) => {
            updateGameHistory('team1', value);
        }
    });

    const team2Score = useScore({
        onChange: (value) => {
            updateGameHistory('team2', value);
        }
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

        if (isCached) {
            clearTimeout(timer);
            setIsCached(false)
        }
    };

    const redo = () => {
        const nextValues = getNextValues();
        team1Score.setValue(nextValues.team1);
        clearTimeout(timer);
        setIsCached(false)
        // TODO make sure I set team2 here as well as team 1
    };

    const isAtFrontOfHistory = history.slice(0, cursor).length === 0;
    const isAtEndOfHistory = cursor === (history.length - 1);

    return {
        undo, redo, isAtFrontOfHistory, isAtEndOfHistory, team1Score, team2Score, hasCachedHistoryItem: () => isCached
    };
};
