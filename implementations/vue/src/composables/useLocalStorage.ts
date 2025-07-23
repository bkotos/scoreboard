import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): [Ref<T>, (value: T | ((prev: T) => T)) => void] {
  const storedValue = ref<T>(defaultValue) as Ref<T>

  // Initialize from localStorage
  try {
    const item = window.localStorage.getItem(key)
    if (item !== null) {
      storedValue.value = JSON.parse(item) as T
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
  }

  // Watch for changes and update localStorage
  watch(
    storedValue,
    (newValue: T) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  const setValue = (value: T | ((prev: T) => T)): void => {
    storedValue.value = typeof value === 'function' ? (value as (prev: T) => T)(storedValue.value) : value
  }

  return [storedValue, setValue]
} 