import create from "zustand"

interface ReplayState {
  turn: {
    timeline: TimelineUnit[]
  }
  replay: {
    currentIndex: number
  }
}

interface TimelineUnit {
  type: "movement"
  characterId: string
  from: [x: number, z: number]
  to: [x: number, z: number]
}

export const useReplayStore = create<ReplayState>((set, get) => ({
  turn: {
    timeline: [
      {
        type: "movement",
        characterId: "character1",
        from: [0, 0],
        to: [0, 5],
      },
    ],
  },
  replay: { currentIndex: -1 },
  next: () =>
    set((state) => ({
      replay: { currentIndex: state.replay.currentIndex + 1 },
    })),
}))
