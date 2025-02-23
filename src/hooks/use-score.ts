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
        const newValue = value + 1
        setValue(newValue)
        onChange(newValue)
    }
    const subtractOne = () => {
        if (value > 0) {
            const newValue = value - 1
            setValue(newValue)
            onChange(newValue)
        }
    }

    return {
        value,
        addOne,
        subtractOne,
        setValue
    }
}
