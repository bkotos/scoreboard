<template>
  <div aria-label="Game controls" class="has-text-left">
    <!-- Undo Button -->
    <button 
      v-if="showUndo" 
      class="button" 
      @click="$emit('undo')"
      :disabled="!canUndo"
    >
      Undo
    </button>
    
    <!-- Redo Button -->
    <button 
      v-if="showRedo" 
      class="button" 
      @click="$emit('redo')"
      :disabled="!canRedo"
    >
      Redo
    </button>
    
    <!-- Spacing -->
    <br><br>
    
    <!-- New Game Button -->
    <button 
      class="button" 
      @click="$emit('new-game')"
    >
      New game
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  canUndo: boolean
  canRedo: boolean
  showUndo: boolean
  showRedo: boolean
}

interface Emits {
  (e: 'undo'): void
  (e: 'redo'): void
  (e: 'new-game'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script> 