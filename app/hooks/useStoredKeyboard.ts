import { useEffect } from "react";
import useGameStore from "./useGameStore";

export default function useStoredKeyboard() {
  const { addDownKey, deleteDownKey, clearDownKeys } = useGameStore(
    (s) => s.keyboard
  );

  useEffect(() => {
    const downHandler = ({ code }: KeyboardEvent) => {
      addDownKey(code);
    };

    const upHandler = ({ code }: KeyboardEvent) => {
      deleteDownKey(code);
    };

    window.addEventListener("keydown", downHandler, { passive: true });
    window.addEventListener("keyup", upHandler, { passive: true });
    window.addEventListener("blur", clearDownKeys, { passive: true });

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
      window.removeEventListener("keyup", clearDownKeys);
    };
  }, [addDownKey, deleteDownKey, clearDownKeys]);
}
