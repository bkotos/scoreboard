<template>
  <div class="container pt-6">
    <div class="columns">
      <!-- Team 1 -->
      <div class="column">
        <div class="card team1-card" role="listitem">
          <div class="card-content has-text-centered p-4">
            <h2 
              class="subtitle mb-0 p-0 has-text-white" 
              role="heading" 
              aria-level="2" 
              id="team1-name"
              v-show="!editTeam1"
            >
              {{ team1Name }}
            </h2>
            <button 
              class="button is-small is-danger ml-2" 
              :aria-label="`Change name of ${team1Name}`"
              @click="startEditTeam1"
              v-if="!editTeam1"
            >
              Edit
            </button>
            <input 
              v-if="editTeam1"
              v-model="team1Name"
              @keyup.enter="saveTeam1Name"
              @keyup.esc="resetTeam1Name"
              @blur="saveTeam1Name"
              class="input is-small"
              aria-label="Change team name"
              ref="team1Input"
            />
            <div class="title score has-text-white" aria-labelledby="team1-name" style="font-size: 180px;">
              {{ team1Score }}
            </div>
          </div>
          <footer class="card-footer">
            <button 
              class="card-footer-item" 
              :aria-label="`Subtract one point for ${team1Name}`"
              @click="handleScoreChange('team1', Math.max(0, team1Score - 1))"
            >
              -1
            </button>
            <button 
              class="card-footer-item" 
              :aria-label="`Add one point for ${team1Name}`"
              @click="handleScoreChange('team1', team1Score + 1)"
            >
              +1
            </button>
          </footer>
        </div>
      </div>

      <!-- Team 2 -->
      <div class="column">
        <div class="card team2-card" role="listitem">
          <div class="card-content has-text-centered p-4">
            <h2 
              class="subtitle mb-0 p-0 has-text-white" 
              role="heading" 
              aria-level="2" 
              id="team2-name"
              v-show="!editTeam2"
            >
              {{ team2Name }}
            </h2>
            <button 
              class="button is-small is-info ml-2" 
              :aria-label="`Change name of ${team2Name}`"
              @click="startEditTeam2"
              v-if="!editTeam2"
            >
              Edit
            </button>
            <input 
              v-if="editTeam2"
              v-model="team2Name"
              @keyup.enter="saveTeam2Name"
              @keyup.esc="resetTeam2Name"
              @blur="saveTeam2Name"
              class="input is-small"
              aria-label="Change team name"
              ref="team2Input"
            />
            <div class="title score has-text-white" aria-labelledby="team2-name" style="font-size: 180px;">
              {{ team2Score }}
            </div>
          </div>
          <footer class="card-footer">
            <button 
              class="card-footer-item" 
              :aria-label="`Subtract one point for ${team2Name}`"
              @click="handleScoreChange('team2', Math.max(0, team2Score - 1))"
            >
              -1
            </button>
            <button 
              class="card-footer-item" 
              :aria-label="`Add one point for ${team2Name}`"
              @click="handleScoreChange('team2', team2Score + 1)"
            >
              +1
            </button>
          </footer>
        </div>
      </div>
    </div>

    <!-- Game Controls -->
    <div aria-label="Game controls" class="has-text-left">
      <button 
        v-if="showUndo" 
        class="button" 
        @click="handleUndo"
        :disabled="history.length === 0"
      >
        Undo
      </button>
      <button 
        v-if="showRedo" 
        class="button" 
        @click="handleRedo"
        :disabled="redoHistory.length === 0"
      >
        Redo
      </button>
      <br><br>
      <button class="button" @click="handleNewGame">New game</button>
    </div>
  </div>
</template>

<script>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from './composables/useLocalStorage.js'

const COMMIT_DELAY_MS = 3000

export default {
  name: 'App',
  setup() {
    // Persistent state using localStorage
    const [team1Name, setTeam1Name] = useLocalStorage('team1Name', 'Team 1')
    const [team2Name, setTeam2Name] = useLocalStorage('team2Name', 'Team 2')
    const [team1Score, setTeam1Score] = useLocalStorage('team1Score', 0)
    const [team2Score, setTeam2Score] = useLocalStorage('team2Score', 0)
    const [history, setHistory] = useLocalStorage('history', [])
    const [redoHistory, setRedoHistory] = useLocalStorage('redoHistory', [])
    const [showUndo, setShowUndo] = useLocalStorage('showUndo', false)
    const [showRedo, setShowRedo] = useLocalStorage('showRedo', false)
    
    // Non-persistent UI state
    const editTeam1 = ref(false)
    const editTeam2 = ref(false)
    const originalTeam1Name = ref(team1Name.value)
    const originalTeam2Name = ref(team2Name.value)
    
    // Refs
    const team1Input = ref(null)
    const team2Input = ref(null)
    const timeoutRef = ref(null)
    const hasPendingChanges = ref(false)

    const resetTeam1Name = () => {
      setTeam1Name(originalTeam1Name.value)
      editTeam1.value = false
    }

    const resetTeam2Name = () => {
      setTeam2Name(originalTeam2Name.value)
      editTeam2.value = false
    }

    const saveTeam1Name = () => {
      if (team1Name.value.trim() === '') {
        setTeam1Name(originalTeam1Name.value)
      } else {
        originalTeam1Name.value = team1Name.value
      }
      editTeam1.value = false
    }

    const saveTeam2Name = () => {
      if (team2Name.value.trim() === '') {
        setTeam2Name(originalTeam2Name.value)
      } else {
        originalTeam2Name.value = team2Name.value
      }
      editTeam2.value = false
    }

    // Watch for edit mode changes to focus input
    const startEditTeam1 = async () => {
      editTeam1.value = true
      await nextTick()
      if (team1Input.value) {
        team1Input.value.focus()
      }
    }

    const startEditTeam2 = async () => {
      editTeam2.value = true
      await nextTick()
      if (team2Input.value) {
        team2Input.value.focus()
      }
    }

    // Helper functions
    const getCurrentState = () => ({
      team1Score: team1Score.value,
      team2Score: team2Score.value
    })

    const resetCommitTimeout = () => {
      if (timeoutRef.value) {
        clearTimeout(timeoutRef.value)
      }
      timeoutRef.value = setTimeout(() => {
        hasPendingChanges.value = false
      }, COMMIT_DELAY_MS)
    }

    const handleScoreChange = (team, newScore) => {
      // Clear redo state when making new changes
      if (showRedo.value) {
        setRedoHistory([])
      }

      // Save current state to history if this is the first change in the group
      if (!hasPendingChanges.value) {
        setHistory([...history.value, getCurrentState()])
        setShowUndo(true)
        hasPendingChanges.value = true
      }
      
      // Update the score
      if (team === 'team1') {
        setTeam1Score(newScore)
      } else {
        setTeam2Score(newScore)
      }
      
      resetCommitTimeout()
    }

    const handleUndo = () => {
      if (history.value.length > 0) {
        setRedoHistory([...redoHistory.value, getCurrentState()])
        const lastState = history.value[history.value.length - 1]
        setTeam1Score(lastState.team1Score)
        setTeam2Score(lastState.team2Score)
        setHistory(history.value.slice(0, -1))
        setShowRedo(true)
        hasPendingChanges.value = false
        
        if (timeoutRef.value) {
          clearTimeout(timeoutRef.value)
        }
      }
    }

    const handleRedo = () => {
      if (redoHistory.value.length > 0) {
        setHistory([...history.value, getCurrentState()])
        const redoState = redoHistory.value[redoHistory.value.length - 1]
        setTeam1Score(redoState.team1Score)
        setTeam2Score(redoState.team2Score)
        setRedoHistory(redoHistory.value.slice(0, -1))
        setShowUndo(true)
      }
    }

    const handleNewGame = () => {
      setTeam1Score(0)
      setTeam2Score(0)
      setHistory([])
      setRedoHistory([])
      setShowUndo(false)
      setShowRedo(false)
      hasPendingChanges.value = false
      
      if (timeoutRef.value) {
        clearTimeout(timeoutRef.value)
      }
    }

    // Lifecycle hooks
    onUnmounted(() => {
      if (timeoutRef.value) {
        clearTimeout(timeoutRef.value)
      }
    })

    return {
      team1Name,
      team2Name,
      team1Score,
      team2Score,
      editTeam1,
      editTeam2,
      originalTeam1Name,
      originalTeam2Name,
      team1Input,
      team2Input,
      history,
      redoHistory,
      showUndo,
      showRedo,
      resetTeam1Name,
      resetTeam2Name,
      saveTeam1Name,
      saveTeam2Name,
      startEditTeam1,
      startEditTeam2,
      handleScoreChange,
      handleUndo,
      handleRedo,
      handleNewGame
    }
  }
}
</script>

<style>
/* Exact colors to match test expectations */
.team1-card {
  background-color: #bc2525 !important;
}

.team2-card {
  background-color: #2772db !important;
}

.team1-card .subtitle,
.team1-card .title,
.team1-card .card-footer button {
  color: #ffffff !important;
}

.team2-card .subtitle,
.team2-card .title,
.team2-card .card-footer button {
  color: #ffffff !important;
}

[role="heading"][aria-level="2"] {
  font-size: 180px !important;
}
</style> 