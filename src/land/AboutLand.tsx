import { useGLTF } from "@react-three/drei";
import { land } from "../game";
import { RigidBody } from "@react-three/rapier";
const AboutLand = () => {
  const { scene } = useGLTF("./model/skillLand.glb");
  return (
    <>
      <RigidBody colliders="trimesh" type="fixed">
        <group position={land.aboutLand.position}>
          <primitive object={scene} />
        </group>
      </RigidBody>
    </>
  );
};

export default AboutLand;
