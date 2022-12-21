import { useRef } from "react";
import useControlledTransform from "~/hooks/useControlledTransform";
import useKeyboardMovement from "~/hooks/useKeyboardMovement";
import ThirdPersonCamera from "./ThirdPersonCamera";

/**
 * TODO: refactor me
 */
export default function Player(props: JSX.IntrinsicElements["mesh"]) {
  const playerMesh = useRef<THREE.Mesh>(null!);
  useKeyboardMovement(playerMesh);

  useControlledTransform("player", playerMesh);

  return (
    <>
      <ThirdPersonCamera mesh={playerMesh} />
      <mesh ref={playerMesh}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
    </>
  );
}
