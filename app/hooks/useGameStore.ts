import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer";

enableMapSet();

interface GameState {
  keyboard: {
    downKeys: Set<string>;
    addDownKey: (key: string) => void;
    deleteDownKey: (key: string) => void;
    clearDownKeys: () => void;
  };

  bears: number;
  increase: (by: number) => void;
}

const useGameStore = create<GameState>()(
  immer((set) => ({
    keyboard: {
      downKeys: new Set(),
      addDownKey: (key) =>
        set((state: GameState) => {
          state.keyboard.downKeys.add(key);
        }),
      deleteDownKey: (key) =>
        set((state: GameState) => {
          state.keyboard.downKeys.delete(key);
        }),
      clearDownKeys: () =>
        set((state: GameState) => {
          state.keyboard.downKeys.clear();
        }),
    },

    bears: 0,
    increase: (by) => set((state: GameState) => ({ bears: state.bears + by })),
  }))
);

export default useGameStore;
