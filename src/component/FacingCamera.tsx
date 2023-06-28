import { useFrame } from "@react-three/fiber";
import { ReactNode, useRef } from "react";
import { Group } from "three";

type Props = {
  children: ReactNode;
};
const FacingCamera = ({ children }: Props) => {
  const ref = useRef<Group>(null);
  useFrame(({ camera }) => {
    if (!ref.current) return;

    // const prevRotation = ref.current.rotation.clone();
    camera.getWorldQuaternion(ref.current.quaternion);
  });
  return <group ref={ref}>{children}</group>;
};

export default FacingCamera;
