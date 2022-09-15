import create from "zustand"
import shortid from "shortid"

interface ReplayState {
  turn: {
    id: string
    timeline?: any[]
  }
}

export const useReplayStore = create<ReplayState>((set) => ({
  turn: {
    id: shortid(),
    timeline: [{}, {}, {}],
  },

  next: () => set((state) => ({ turn: { id: state.turn.id } })),
}))
