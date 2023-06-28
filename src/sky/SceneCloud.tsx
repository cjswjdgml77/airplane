import { useAnimations, useGLTF } from "@react-three/drei";

const SceneCloud = () => {
  const { scene, animations } = useGLTF("./model/eagle.glb");
  console.log(scene, animations);
  const { actions } = useAnimations(animations, scene);
  actions["fly"]?.play();
  return (
    <>
      <group rotation={[0, Math.PI, 0]} scale={0.1} position={[0, 3, 0]}>
        <primitive object={scene} />
      </group>
    </>
  );
};
export default SceneCloud;
