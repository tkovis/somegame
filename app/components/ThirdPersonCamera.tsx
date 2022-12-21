import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { useControls } from "leva";

export default function ThirdPersonCamera({
  mesh,
}: {
  mesh: React.MutableRefObject<THREE.Mesh>;
}) {
  const camera = useRef<THREE.Camera>(null!);
  const { cameraOffsetX, cameraOffsetY, cameraLookAhead } = useControls(
    "camera",
    {
      cameraOffsetX: -5,
      cameraOffsetY: 4,
      cameraLookAhead: 2,
    }
  );

  useFrame((state, delta) => {
    const newPosition = new Vector3(
      mesh.current.position.x,
      mesh.current.position.y,
      mesh.current.position.z
    ).add(
      new Vector3(cameraOffsetX, cameraOffsetY, 0).applyQuaternion(
        mesh.current.quaternion
      )
    );
    const meshCurrent = new Vector3();
    meshCurrent.copy(mesh.current.position);
    camera.current.position.set(newPosition.x, newPosition.y, newPosition.z);
    camera.current.lookAt(
      meshCurrent.add(
        new Vector3(cameraLookAhead, 0, 0).applyQuaternion(
          mesh.current.quaternion
        )
      )
    );
  });

  return <PerspectiveCamera makeDefault={true} ref={camera} />;
}
