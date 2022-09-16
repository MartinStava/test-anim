import create from "zustand"
import { firstCharacterId, secondCharacterId } from "../config"

interface GameState {
  state: {
    characters: {
      characterId: string
      position: { x: number; z: number }
    }[]
  }

  currentTurn: {
    timeline: {
      type: "movement"
      characterId: string
      destination: { x: number; z: number }
    }[]
  }
}

export const useGameStore = create<GameState>((_set) => ({
  state: {
    characters: [
      { characterId: firstCharacterId, position: { x: 0, z: 0 } },
      { characterId: secondCharacterId, position: { x: 0, z: -5 } },
    ],
  },

  currentTurn: {
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
}))
