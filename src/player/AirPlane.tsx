import { useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  RapierRigidBody,
  RigidBody,
  quat,
  vec3,
} from "@react-three/rapier";
import { useRef, useState } from "react";
import * as THREE from "three";
// import useGame from "../stores/useGame";

const AirPlane = () => {
  const { scene } = useGLTF("./model/airplane.glb");
  const plane = useRef<RapierRigidBody>(null);
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const [smoothCamera] = useState(() => new THREE.Vector3());
  const [smoothTarget] = useState(() => new THREE.Vector3());
  // const setText = useGame((state) => state.setText);
  useFrame((state, delta) => {
    if (!plane.current) return;
    const { forward, right, backward, left } = getKeys();
    const impluse = { x: 0, y: 0, z: 0 };
    const implusStrength = 20 * delta;
    const bladeStrength = 30;
    const rotate = quat(plane.current.rotation());
    let angle = 0;
    if (forward) {
      impluse.z -= implusStrength;
    }
    if (backward) {
      impluse.z += implusStrength;
    }
    if (left) {
      if (backward) impluse.x += implusStrength;
      else impluse.x -= implusStrength;
      angle = Math.PI * 0.125;
    }
    if (right) {
      if (backward) impluse.x -= implusStrength;
      else impluse.x += implusStrength;

      angle = Math.PI * -0.125;
    }
    // if (up) {
    //   impluse.y += implusStrength * 0.5;
    // }
    // if (down) {
    //   impluse.y -= implusStrength * 0.5;
    // }

    scene.children[1].children[0].rotation.x += delta * bladeStrength;
    scene.children[1].children[1].rotation.x += delta * bladeStrength;
    rotate.setFromEuler(
      new THREE.Euler(
        0,
        backward ? Math.PI : 0,
        angle,
        backward ? "YXZ" : "XYZ"
      )
    );

    plane.current.setRotation(rotate, true);
    plane.current.applyImpulse(impluse, true);
    /**
     * Camera
     */
    const position = vec3(plane.current.translation());
    position.y = 1;
    plane.current.setTranslation(position, true);
    const cameraPosition = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();

    cameraPosition.copy(position);
    if (forward) {
      cameraPosition.z += 4.25;
      cameraPosition.y += 2;
      cameraTarget.y += 0.25;
    } else if (backward) {
      cameraPosition.z -= 4.25;
      cameraPosition.y += 2;
      cameraTarget.y += 0.25;
    } else {
      cameraPosition.z += 7.0;
      cameraPosition.y += 3.0;
      cameraTarget.y -= 2.0;
    }
    cameraTarget.copy(position);

    smoothCamera.lerp(cameraPosition, 4 * delta);
    smoothTarget.lerp(cameraTarget, 4 * delta);
    state.camera.position.copy(smoothCamera);
    state.camera.lookAt(smoothTarget);

    /** Plane position Effect*/
    // if (
    //   position.x > -14.5 &&
    //   -12.5 > position.x &&
    //   position.z > -18 &&
    //   position.z < -16.5
    // ) {
    //   setText("first");
    // }
    // if (
    //   position.x > 3.5 &&
    //   position.x < 5 &&
    //   position.z > -39.5 &&
    //   position.z < -36.5
    // ) {
    //   setText("second");
    // }
    // if (
    //   position.x > -7 &&
    //   position.x < -3 &&
    //   position.z > -51 &&
    //   position.z < -50
    // ) {
    //   setText("third");
    // }

    if (position.z < -60 && position.z > -70) {
      console.log("wind");
      plane.current.applyImpulse({ x: -0.2, y: 0, z: 0 }, true);
      // setText("forth");
    }
    // if (
    //   position.x > -10.5 &&
    //   position.x < -9 &&
    //   position.z > -71 &&
    //   position.z < -70
    // ) {
    //   setText("fifth");
    // }
    if (position.z < -70 && position.z > -80) {
      plane.current.applyImpulse({ x: 0.2, y: 0, z: 0 }, true);
    }

    // if (
    //   position.x > 13 &&
    //   position.x < 15.5 &&
    //   position.z > -83 &&
    //   position.z < -81
    // ) {
    //   setText("sixth");
    // }
  });

  return (
    <>
      <RigidBody
        position={[0, 1, 0]}
        ref={plane}
        linearDamping={0.5}
        angularDamping={0.5}
        colliders={false}
      >
        <BallCollider args={[1]} mass={5} position={[0, 0.6, 0]} />
        <group rotation={[0, -Math.PI * 0.5, 0]}>
          <primitive object={scene} />
        </group>
      </RigidBody>
    </>
  );
};

export default AirPlane;
