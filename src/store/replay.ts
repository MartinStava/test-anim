import create from "zustand"
import shortid from "shortid"

interface ReplayState {
  turn: {
    id: string
    timeline?: TimelineUnit[]
  }
}

interface TimelineUnit {
  characterId: string
}

export const useReplayStore = create<ReplayState>((set) => ({
  turn: {
    id: shortid(),
    timeline: [{ characterId: shortid() }],
  },

  next: () => set((state) => ({ turn: { id: state.turn.id } })),
}))
