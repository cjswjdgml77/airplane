import { useMemo } from "react";
import * as THREE from "three";
import { road } from "../game";
import { useGLTF } from "@react-three/drei";
import Eagle from "./Eagle";
import MyText from "../component/MyText";
import Warf from "./Warf";
import { RigidBody } from "@react-three/rapier";
const Road = () => {
  const { scene } = useGLTF("./model/woodgate.glb");
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-10, 0, -10),
        new THREE.Vector3(-13, 0, -20),
        new THREE.Vector3(0, 0, -30),
        new THREE.Vector3(4, 0, -40),
        new THREE.Vector3(-5, 0, -50),
        new THREE.Vector3(5, 0, -60),
        new THREE.Vector3(-10, 0, -70),
        new THREE.Vector3(15, 0, -80),
        new THREE.Vector3(-7, 0, -90),
        new THREE.Vector3(0, 0, road.endPoint),
      ],
      false,
      "catmullrom"
    );
  }, []);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1);
    shape.lineTo(0, 1);
    return shape;
  }, []);

  return (
    <>
      <group>
        {/* Road  */}
        <mesh>
          <extrudeGeometry
            args={[
              shape,
              { steps: 2000, bevelEnabled: false, extrudePath: curve },
            ]}
          />
          <meshStandardMaterial opacity={0.7} color={"white"} transparent />
        </mesh>

        {/* Woodgate */}
        <RigidBody type="fixed" colliders="trimesh">
          <group scale={0.4} position={[-7.5, 0, -50]}>
            <primitive object={scene} />
          </group>
        </RigidBody>

        {/* Eagle */}
        <Eagle />

        {/* Text  */}
        <MyText
          position={[-19, 4, -23]}
          rotation={[0, Math.PI * 0.25, 0]}
          text={"Enjoy!\nThe Journey"}
          animationName="first"
        />
        <MyText
          position={[5, 4, -45]}
          rotation={[0, -Math.PI * 0.2, 0]}
          text={"Go through\nthe gate!"}
          animationName="second"
          color="#0A6EBD"
        />
        <MyText
          position={[-10, 2, -48]}
          rotation={[0, 0, 0]}
          text={"You are on the half way!"}
          animationName="third"
          color="#3F979B"
        />
        <MyText
          position={[2, 2, -65]}
          rotation={[0, 0, 0]}
          text={"Watch out for wind!"}
          animationName="forth"
          color="#FF6666"
        />
        <MyText
          position={[-15, 3, -75]}
          rotation={[0, 0, 0]}
          text={"Keep Going!"}
          animationName="fifth"
          color="#FF6666"
        />
        <MyText
          position={[10, 4, -85]}
          rotation={[0, 0, 0]}
          text={"You are the best pilot!"}
          animationName="sixth"
          color="#9AC5F4"
        />

        {/* Warf */}
        <Warf position={[-13.3, 0.1, -16]} animationName="first" />
        <Warf position={[4, 0.1, -38]} animationName="second" />
        <Warf position={[-4.85, 0.1, -49.5]} animationName="third" />
        <Warf position={[4.9, 0.1, -59]} animationName="forth" />
        <Warf position={[-10, 0.1, -69]} animationName="fifth" />
        <Warf position={[14.8, 0.1, -80]} animationName="sixth" />
      </group>
    </>
  );
};

export default Road;
