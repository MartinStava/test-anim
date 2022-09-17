import create from "zustand"
import { Vector2 } from "three"
import { firstCharacterId, secondCharacterId } from "../config"

interface GameState {
  origin: CharacterState[]

  replay: CharacterState[]

  counter: number

  start: () => void

  test: () => void
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

  counter: 1,

  start: () =>
    set(() => ({
      replay: [
        { characterId: firstCharacterId, position: new Vector2(0, 5) },
        { characterId: secondCharacterId, position: new Vector2(5, 5) },
      ],
    })),

  test: () =>
    set((state) => ({
      counter: state.counter + 1,
    })),
}))
