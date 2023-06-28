import { useAnimations, useGLTF } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { customPos } from "../types";
import { eagle } from "../game";
import * as THREE from "three";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  euler,
  quat,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

type Props = {
  position?: customPos;
};
const Eagle = () => {
  const eagle1Ref = useRef<RapierRigidBody>(null);
  const eagle2Ref = useRef<RapierRigidBody>(null);
  const { scene: eagle1, animations } = useGLTF("./model/eagle.glb");
  const { scene: eagle2, animations: eagle2Animations } =
    useGLTF("./model/eagle2.glb");
  const { actions: eagle1Actions } = useAnimations(animations, eagle1);
  const { actions: eagle2Actions } = useAnimations(eagle2Animations, eagle2);
  useEffect(() => {
    eagle1Actions["fly"]?.play();
    eagle2Actions["fly"]?.play();
  }, [eagle1Actions, eagle2Actions]);
  useFrame((state, delta) => {
    if (!eagle1Ref.current || !eagle2Ref.current) return;
    const clock = state.clock.getElapsedTime();
    const position = eagle1Ref.current.translation();
    const quaternion = quat(eagle1Ref.current.rotation());

    position.x = Math.sin(clock * 0.5) * 15;
    position.y = 1;
    position.z = -10 + Math.cos(clock * 0.5) * 5;
    const angle =
      Math.cos(clock * 0.5) < 0 ? Math.cos(clock * 0.5) : Math.cos(clock * 0.5);
    const data = Math.PI * -0.5 - (angle * 5) / -Math.PI;
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), data);
    eagle1Ref.current.setRotation(quaternion, true);
    eagle1Ref.current.setTranslation(position, true);

    const position2 = eagle2Ref.current.translation();
    const quaternion2 = quat(eagle2Ref.current.rotation());
    const angle2 =
      Math.cos(clock * 0.5) < 0 ? Math.cos(clock * 0.5) : Math.cos(clock * 0.5);
    const data2 = Math.PI * -0.5 - (angle2 * 5) / -Math.PI;
    quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), data2);
    position2.x = Math.sin(clock * 0.9) * 15;
    position2.y = 1;
    position2.z = -80 + Math.cos(clock * 0.9) * 5;

    eagle2Ref.current.setRotation(quaternion2, true);
    eagle2Ref.current.setTranslation(position2, true);
  });
  return (
    <>
      <RigidBody
        position={[0, 1, -10]}
        ref={eagle1Ref}
        colliders={false}
        name="eagle"
      >
        <CuboidCollider args={[0.5, 0.5, 0.5]} />
        <group scale={0.1} rotation={[0, Math.PI * 0.5, 0]}>
          <primitive object={eagle1} />
        </group>
      </RigidBody>
      <RigidBody
        position={[0, 1, -80]}
        ref={eagle2Ref}
        colliders={false}
        name="eagle"
      >
        <CuboidCollider args={[0.5, 0.5, 0.5]} />

        <group scale={0.1} rotation={[0, Math.PI * 0.5, 0]}>
          <primitive object={eagle2} />
        </group>
      </RigidBody>
    </>
  );
};

export default Eagle;
