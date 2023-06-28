import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame";

const EndPoint = () => {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useTexture("./textures/goal.png");
  const { scene, animations } = useGLTF("./model/end-point.glb");
  const { actions } = useAnimations(animations, scene);
  const setStage = useGame((state) => state.setStage);
  actions["move"]?.play();
  actions["move2"]?.play();
  actions["move3"]?.play();

  useFrame((state, delta) => {
    if (!ref.current) return;
    const clock = state.clock.getElapsedTime();
    const position = ref.current.geometry.attributes.position;
    const { array, count } = position;
    for (let i = 0; i < count; i++) {
      //   position.setX(i * 3, Math.abs(Math.sin(clock + array[i * 3])));
      position.setZ(i * 3 + 1, Math.sin((clock + array[i * 3]) * 10) / 3);
    }
    position.needsUpdate = true;
  });
  return (
    <>
      <group position={[0, 0, -100]}>
        <mesh position={[0, 5, 0]} ref={ref}>
          <planeGeometry args={[3, 1, 7, 7]} />
          <meshStandardMaterial
            side={THREE.DoubleSide}
            color={"black"}
            map={texture}
            transparent
          />
        </mesh>
        <RigidBody colliders={false} type="fixed">
          <CuboidCollider
            args={[1, 1, 1]}
            sensor
            onIntersectionEnter={() => {
              console.log("inter");
            }}
          />
          <group rotation={[0, Math.PI * 0.25, 0]}>
            <primitive object={scene} />
          </group>
        </RigidBody>
      </group>
    </>
  );
};

export default EndPoint;
