import create from "zustand"
import { firstCharacterId, secondCharacterId } from "../config"

interface GameState {
  state: {
    characters: {
      characterId: string
      position: { x: number; z: number }
    }[]
    timeline: TimelineStep[]
  }

  currentIndex: number

  getCurrentStep: () => TimelineStep | undefined

  next: () => void
}

interface TimelineStep {
  type: "movement"
  characterId: string
  destination: { x: number; z: number }
}

export const useGameStore = create<GameState>((set, get) => ({
  state: {
    characters: [
      { characterId: firstCharacterId, position: { x: 0, z: 0 } },
      { characterId: secondCharacterId, position: { x: 0, z: -5 } },
    ],
    timeline: [
      {
        type: "movement",
        characterId: firstCharacterId,
        destination: { x: 0, z: 5 },
      },
      {
        type: "movement",
        characterId: secondCharacterId,
        destination: { x: 0, z: 5 },
      },
    ],
  },

  getCurrentStep: () => {
    const currentIndex = get().currentIndex
    const timeline = get().state.timeline

    if (currentIndex < 0 || currentIndex >= timeline.length) {
      return undefined
    }

    return timeline[currentIndex]
  },

  currentIndex: -1,

  next: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
}))
