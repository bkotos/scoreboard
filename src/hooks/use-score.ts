import { useEffect, useState } from 'react'

export interface IScore {
    value: number
    addOne: () => void
    subtractOne: () => void
    setValue: (value: number) => void
}

export interface UseScoreProps {
    onChange: (score: number) => void
}

export const useScore = ({ onChange }: UseScoreProps): IScore => {
    const [value, setValue] = useState<number>(0)
    const addOne = () => {
        setValue(value + 1)
    }
    const subtractOne = () => {
        if (value > 0) setValue(value - 1)
    }

    useEffect(() => {
        onChange(value)
    }, [value])

    return {
        value,
        addOne,
        subtractOne,
        setValue
    }
}
