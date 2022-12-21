import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { useControls } from "leva";
import useGameStore from "./useGameStore";
import useStoredKeyboard from "./useStoredKeyboard";

export default function useKeyboardMovement(
  mesh: React.MutableRefObject<THREE.Mesh>
) {
  useStoredKeyboard();
  const { movementSpeed, rotationSpeed } = useControls("movement", {
    movementSpeed: 2,
    rotationSpeed: 2,
  });
  const downKeys = useGameStore((s) => s.keyboard.downKeys);
  console.log(downKeys);
  useFrame((_, delta) => {
    if (downKeys.size) {
      if (downKeys.has("KeyW")) {
        mesh.current.position.add(
          new Vector3(movementSpeed * delta, 0, 0).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyQ")) {
        mesh.current.position.add(
          new Vector3(0, 0, -movementSpeed * delta).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyS")) {
        mesh.current.position.add(
          new Vector3(-movementSpeed * delta, 0, 0).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyE")) {
        mesh.current.position.add(
          new Vector3(0, 0, movementSpeed * delta).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyZ")) {
        mesh.current.position.add(
          new Vector3(0, movementSpeed * delta, 0).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyX")) {
        mesh.current.position.add(
          new Vector3(0, -movementSpeed * delta, 0).applyQuaternion(
            mesh.current.quaternion
          )
        );
      }
      if (downKeys.has("KeyA")) {
        mesh.current.rotateY(rotationSpeed * delta);
      }
      if (downKeys.has("KeyD")) {
        mesh.current.rotateY(-rotationSpeed * delta);
      }
    }
  });
}
