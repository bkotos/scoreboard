import { useState } from 'react'

export interface IScore {
    value: number
    addOne: () => void
    subtractOne: () => void
    setValue: (value: number) => void
}

export const useScore = (): IScore => {
    const [value, setValue] = useState<number>(0)
    const addOne = () => {
        setValue(value + 1)
    }
    const subtractOne = () => {
        if (value > 0) setValue(value - 1)
    }

    return {
        value,
        addOne,
        subtractOne,
        setValue
    }
}
