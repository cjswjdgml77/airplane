import vertext from "../shader/warf/vertex.glsl";
import fragment from "../shader/warf/fragment.glsl";
import particleVertex from "../shader/warf/particle/vertex.glsl";
import particleFragment from "../shader/warf/particle/fragment.glsl";
import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  BufferAttribute,
  Color,
  DoubleSide,
  Mesh,
  Points,
  ShaderMaterial,
} from "three";
import { useGLTF } from "@react-three/drei";
import { customPos } from "../types";
import useGame from "../stores/useGame";
import ParticleShader from "./ParticleShader";
import WarfShader from "./WarfShader";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
extend({ ParticleShader });
extend({ WarfShader });

type Props = {
  position?: customPos;
  animationName?: string;
};
const Warf = ({ position = [0, 0, 0], animationName = "" }: Props) => {
  const checkPointref = useRef<Mesh>(null);

  const particleRef = useRef<Points>(null);
  const {
    scene: { children },
  } = useGLTF("./model/checkpoint.glb");
  const checkPointMesh = children[0] as Mesh;
  const count = 30;
  const setText = useGame((state) => state.setText);
  const currentText = useGame((state) => state.currentText);
  if (currentText === animationName) {
    console.log(animationName);
    if (particleRef.current && checkPointref.current) {
      const particleMaterial = particleRef.current.material as ShaderMaterial;
      const checkPointMaterial = checkPointref.current
        .material as ShaderMaterial;

      particleMaterial.uniforms.uColor.value = new Color(0.478, 0.761, 1);
      checkPointMaterial.uniforms.uColor.value = new Color(0.478, 0.761, 1);
    }
  }

  useFrame((state, delta) => {
    if (!checkPointref.current || !particleRef.current) return;
    const clock = state.clock.getElapsedTime();
    const material = checkPointref.current.material as ShaderMaterial;
    checkPointref.current.rotation.set(0, clock, 0);

    const particleMaterial = particleRef.current.material as ShaderMaterial;

    const arr = (
      particleRef.current.geometry.attributes.position as BufferAttribute
    ).array;
    for (let i = 0; i < count; i++) {
      particleRef.current.geometry.attributes.position.setY(
        i,
        arr[i * 3 + 2] + ((clock * arr[i * 3 + 2] * 0.3) % 0.5)
      );
    }
    particleRef.current.geometry.attributes.position.needsUpdate = true;
  });
  const geometry = useMemo(() => {
    const position = new Float32Array(count * 3);
    const random = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      position[i * 3] = Math.random() * 0.8;
      position[i * 3 + 1] = Math.random() * 1;
      position[i * 3 + 2] = Math.random() * 0.8;

      random[i] = Math.random();
    }
    return (
      <bufferGeometry>
        <bufferAttribute
          array={position}
          attach={"attributes-position"}
          itemSize={3}
          count={position.length / 3}
        />
        <bufferAttribute
          array={random}
          attach={"attributes-aScale"}
          itemSize={1}
          count={random.length}
        />
      </bufferGeometry>
    );
  }, []);
  // const particle = new ParticleShader();
  return (
    <>
      <RigidBody position={position} colliders={false}>
        <CuboidCollider
          args={[1, 1, 1]}
          sensor
          onIntersectionEnter={(collider) => {
            if (collider.rigidBodyObject?.name === "eagle") return;
            setText(animationName);
          }}
        />
        <group>
          <mesh
            position={[0, 0, 0]}
            ref={checkPointref}
            geometry={checkPointMesh.geometry}
          >
            <warfShader transparent side={DoubleSide} />
          </mesh>
          <points position={[-0.3, 0, -0.4]} ref={particleRef}>
            {geometry}
            <particleShader />
          </points>
        </group>
      </RigidBody>
    </>
  );
};

export default Warf;
