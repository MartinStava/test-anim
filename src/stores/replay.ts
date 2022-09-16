import create from "zustand"

interface ReplayState {
  currentIndex: number

  next: () => void
}

export const useReplayStore = create<ReplayState>((set) => ({
  currentIndex: -1,

  next: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),
}))
