import create from "zustand"
import { Vector2 } from "three"
import { firstCharacterId, secondCharacterId } from "../config"

interface GameState {
  origin: CharacterState[]

  replay: CharacterState[]

  start: () => void
}

interface CharacterState {
  characterId: string
  position: Vector2
}

export const useGameStore = create<GameState>((set, get) => ({
  origin: [
    { characterId: firstCharacterId, position: new Vector2(0, 0) },
    { characterId: secondCharacterId, position: new Vector2(0, -5) },
  ],

  replay: [],

  start: () =>
    set(() => ({
      replay: [
        { characterId: firstCharacterId, position: new Vector2(0, 5) },
        { characterId: secondCharacterId, position: new Vector2(5, 5) },
      ],
    })),
}))
