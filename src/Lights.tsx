import { useRef } from "react";
import { DirectionalLight } from "three";

const Lights = () => {
  const ref = useRef<DirectionalLight>(null);
  // useHelper(ref, DirectionalLightHelper);
  return (
    <>
      <directionalLight
        position={[4, 4, 1]}
        intensity={1.5}
        ref={ref}
        castShadow
        // shadow-mapSize={[1024, 1024]}
        // shadow-camera-near={1}
        // shadow-camera-far={10}
        // shadow-camera-top={10}
        // shadow-camera-right={10}
        // shadow-camera-bottom={-10}
        // shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};

export default Lights;
