import create from "zustand"
import { firstCharacterId, secondCharacterId } from "../config"

interface GameState {
  state: {
    characters: {
      characterId: string
      position: [x: number, z: number]
    }[]
  }

  currentTurn: {
    timeline: {
      type: "movement"
      characterId: string
      destination: [x: number, z: number]
    }[]
  }

  replay: {
    index: number
  }

  next: () => void
}

export const useGameStore = create<GameState>((set) => ({
  state: {
    characters: [
      { characterId: firstCharacterId, position: [0, 0] },
      { characterId: secondCharacterId, position: [5, 0] },
    ],
  },

  currentTurn: {
    timeline: [
      {
        type: "movement",
        characterId: firstCharacterId,
        destination: [0, 5],
      },
      {
        type: "movement",
        characterId: secondCharacterId,
        destination: [0, 5],
      },
    ],
  },

  replay: { index: -1 },

  next: () =>
    set((state) => ({
      replay: {
        index:
          state.replay.index >= state.currentTurn.timeline.length - 1
            ? -1
            : state.replay.index + 1,
      },
    })),
}))
