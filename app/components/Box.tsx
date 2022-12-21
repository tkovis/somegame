import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import useControlledTransform from "~/hooks/useControlledTransform";

export default function Box({ id }: { id: string }) {
  const mesh = useRef<THREE.Mesh>(null!);
  useControlledTransform(id, mesh);

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.011;
    mesh.current.rotation.z += 0.0111;
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} frustumCulled={false}>
      <boxGeometry args={[1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
