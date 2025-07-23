import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = ref(defaultValue)

  // Initialize from localStorage
  try {
    const item = window.localStorage.getItem(key)
    if (item !== null) {
      storedValue.value = JSON.parse(item)
    }
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error)
  }

  // Watch for changes and update localStorage
  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    },
    { deep: true }
  )

  const setValue = (value) => {
    storedValue.value = typeof value === 'function' ? value(storedValue.value) : value
  }

  return [storedValue, setValue]
} 