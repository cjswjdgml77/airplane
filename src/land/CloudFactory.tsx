import { useAnimations, useGLTF } from "@react-three/drei";

const CloudFactory = () => {
  const { scene, animations } = useGLTF("./model/cloud-factory.glb");
  const { actions } = useAnimations(animations, scene);
  actions["Plane.001Action"]?.play();
  console.log(actions);
  return (
    <>
      <primitive object={scene} />
    </>
  );
};

export default CloudFactory;
