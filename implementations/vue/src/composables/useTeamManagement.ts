import { ref, nextTick, type Ref } from 'vue'

interface TeamManagement {
  isEditing: Ref<boolean>
  inputRef: Ref<HTMLInputElement | null>
  startEditing: () => Promise<void>
  saveName: () => void
  cancelEditing: () => void
}

export function useTeamManagement(initialName: string, onNameChange: (name: string) => void): TeamManagement {
  const isEditing = ref<boolean>(false)
  const originalName = ref<string>(initialName)
  const inputRef = ref<HTMLInputElement | null>(null)

  const startEditing = async (): Promise<void> => {
    isEditing.value = true
    await nextTick()
    if (inputRef.value) {
      inputRef.value.focus()
    }
  }

  const saveName = (): void => {
    const currentName = inputRef.value?.value || ''
    const trimmedName = currentName.trim()
    
    if (trimmedName === '') {
      onNameChange(originalName.value)
    } else {
      originalName.value = trimmedName
      onNameChange(trimmedName)
    }
    
    exitEditingMode()
  }

  const cancelEditing = (): void => {
    onNameChange(originalName.value)
    exitEditingMode()
  }

  const exitEditingMode = (): void => {
    isEditing.value = false
  }

  return {
    isEditing,
    inputRef,
    startEditing,
    saveName,
    cancelEditing
  }
} 