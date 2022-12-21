import { useControls } from "leva";

export default function useControlledTransform(
  folderName: string,
  mesh: React.MutableRefObject<THREE.Mesh>,
  defaultPosition: [number, number, number] = [0, 0, 0],
  defaultRotation: [number, number, number] = [0, 0, 0]
) {
  useControls(folderName, () => ({
    position: {
      value: defaultPosition,
      onChange: ([x, y, z]) => {
        mesh.current.position.x = x;
        mesh.current.position.y = y;
        mesh.current.position.z = z;
      },
    },
    rotation: {
      value: defaultRotation,
      onChange: ([x, y, z]) => {
        mesh.current.rotation.x = x;
        mesh.current.rotation.y = y;
        mesh.current.rotation.z = z;
      },
    },
  }));
}
