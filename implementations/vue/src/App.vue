<template>
  <div class="container pt-6">
    <!-- Team Cards Row -->
    <div class="columns">
      <!-- Team 1 -->
      <div class="column">
        <TeamCard
          :team-name="team1Name"
          :score="team1Score"
          team-id="team1"
          @update:team-name="updateTeam1Name"
          @update:score="updateTeam1Score"
        />
      </div>
      
      <!-- Team 2 -->
      <div class="column">
        <TeamCard
          :team-name="team2Name"
          :score="team2Score"
          team-id="team2"
          @update:team-name="updateTeam2Name"
          @update:score="updateTeam2Score"
        />
      </div>
    </div>

    <!-- Game Controls -->
    <GameControls
      :can-undo="canUndo"
      :can-redo="canRedo"
      :show-undo="historyManager.showUndo.value"
      :show-redo="historyManager.showRedo.value"
      @undo="handleUndo"
      @redo="handleRedo"
      @new-game="handleNewGame"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLocalStorage } from './composables/useLocalStorage.ts'
import { useHistoryManagement } from './composables/useHistoryManagement.ts'
import type { GameState } from './composables/useHistoryManagement.ts'
import TeamCard from './components/TeamCard.vue'
import GameControls from './components/GameControls.vue'

const [team1Name, setTeam1Name] = useLocalStorage('team1Name', 'Team 1')
const [team2Name, setTeam2Name] = useLocalStorage('team2Name', 'Team 2')
const [team1Score, setTeam1Score] = useLocalStorage('team1Score', 0)
const [team2Score, setTeam2Score] = useLocalStorage('team2Score', 0)

const historyManager = useHistoryManagement()

const canUndo = computed(() => historyManager.history.value.length > 0)
const canRedo = computed(() => historyManager.redoHistory.value.length > 0)

const updateTeam1Name = (newName: string): void => {
  setTeam1Name(newName)
}

const updateTeam2Name = (newName: string): void => {
  setTeam2Name(newName)
}

const updateTeam1Score = (newScore: number): void => {
  historyManager.recordStateChange(
    team1Score.value,
    team2Score.value,
    () => setTeam1Score(newScore)
  )
}

const updateTeam2Score = (newScore: number): void => {
  historyManager.recordStateChange(
    team1Score.value,
    team2Score.value,
    () => setTeam2Score(newScore)
  )
}

const handleUndo = (): void => {
  historyManager.undoLastChange(
    team1Score.value,
    team2Score.value,
    (restoredState: GameState) => {
      setTeam1Score(restoredState.team1Score)
      setTeam2Score(restoredState.team2Score)
    }
  )
}

const handleRedo = (): void => {
  historyManager.redoLastChange(
    team1Score.value,
    team2Score.value,
    (restoredState: GameState) => {
      setTeam1Score(restoredState.team1Score)
      setTeam2Score(restoredState.team2Score)
    }
  )
}

const handleNewGame = (): void => {
  setTeam1Score(0)
  setTeam2Score(0)
  historyManager.resetHistory()
}
</script>

<style>
/* Team-specific styling */
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

/* Score font size - matches test requirements */
[role="heading"][aria-level="2"] {
  font-size: 180px !important;
}
</style> 