import { Text3D } from "@react-three/drei";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Mesh } from "three";
import useGame from "../stores/useGame";
type Props = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  text?: string;
  animationName?: string;
  color?: string;
};
const MyText = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  animationName,
  text = "Hello\nWorld",
  color = "#ffffff",
}: Props) => {
  const ref = useRef<Mesh>(null);
  const currentText = useGame((state) => state.currentText);
  if (currentText === animationName) {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.scale,
      { x: 0, y: 0, z: 0 },
      { duration: 0.5, x: 1, y: 1, z: 1 }
    );
  }

  return (
    <>
      <Text3D
        font={"./font/Acme_Regular.json"}
        position={position}
        rotation={rotation}
        ref={ref}
        scale={0}
      >
        {text}
        <meshBasicMaterial color={color} />
      </Text3D>
    </>
  );
};

export default MyText;
