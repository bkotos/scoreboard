<template>
  <div :class="teamCardClasses" role="listitem">
    <div class="card-content has-text-centered p-4">
      <!-- Team Name Display/Edit -->
      <h2 
        :class="teamNameClasses" 
        role="heading" 
        aria-level="1" 
        :id="teamNameId"
        v-show="!teamManagement.isEditing.value"
      >
        {{ displayName }}
      </h2>
      
      <!-- Edit Button -->
      <button 
        :class="editButtonClasses"
        :aria-label="`Change name of ${displayName}`"
        @click="teamManagement.startEditing"
        v-if="!teamManagement.isEditing.value"
      >
        Edit
      </button>
      
      <!-- Edit Input -->
      <input 
        v-if="teamManagement.isEditing.value"
        v-model="displayName"
        @keyup.enter="teamManagement.saveName"
        @keyup.esc="teamManagement.cancelEditing"
        @blur="teamManagement.saveName"
        class="subtitle mb-0 p-0"
        aria-label="Change team name"
        :ref="teamManagement.inputRef"
      />
      
      <!-- Score Display -->
      <div class="title score has-text-white" role="heading" aria-level="2" :aria-labelledby="teamNameId">
        {{ score }}
      </div>
    </div>
    
    <!-- Action Buttons -->
    <footer class="card-footer">
      <button 
        class="card-footer-item"
        :aria-label="`Subtract one point for ${displayName}`"
        @click="decrementScore"
      >
        -1
      </button>
      <button 
        class="card-footer-item"
        :aria-label="`Add one point for ${displayName}`"
        @click="incrementScore"
      >
        +1
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTeamManagement } from '../composables/useTeamManagement.ts'

interface Props {
  teamName: string
  score: number
  teamId: 'team1' | 'team2'
}

interface Emits {
  (e: 'update:teamName', value: string): void
  (e: 'update:score', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const teamManagement = useTeamManagement(
  props.teamName,
  (newName: string) => emit('update:teamName', newName)
)

const teamCardClasses = computed(() => {
  const baseClass = 'card'
  const themeClass = props.teamId === 'team1' ? 'team1-card' : 'team2-card'
  return `${baseClass} ${themeClass}`
})

const teamNameClasses = computed(() => 
  `subtitle mb-0 p-0 has-text-white ${teamManagement.isEditing.value ? '' : 'is-inline'}`
)

const editButtonClasses = computed(() => {
  const baseClass = 'button is-small ml-2'
  const themeClass = props.teamId === 'team1' ? 'is-danger' : 'is-info'
  return `${baseClass} ${themeClass}`
})

const teamNameId = computed(() => `${props.teamId}-name`)

const displayName = computed({
  get: () => props.teamName,
  set: (value: string) => emit('update:teamName', value)
})

const incrementScore = (): void => {
  emit('update:score', props.score + 1)
}

const decrementScore = (): void => {
  const newScore = Math.max(0, props.score - 1)
  emit('update:score', newScore)
}
</script> 