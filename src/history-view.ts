export const undoButton = () => document.getElementById('btn-undo') as HTMLButtonElement
export const redoButton = () => document.getElementById('btn-redo') as HTMLButtonElement

export const showUndoButton = () => undoButton().classList.remove('is-hidden')

export const enableUndoButton = () => undoButton().disabled = false
export const disableUndoButton = () => undoButton().disabled = true

export const showRedoButton = () => document.getElementById('btn-redo').classList.remove('is-hidden')
