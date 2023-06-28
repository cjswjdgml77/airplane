import { useAnimations, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { customPos } from "../types";
import useGame from "../stores/useGame";
import PressX from "../keyboard/PressX";
import Cloud from "../sky/MyCloud";

type Props = {
  position?: customPos;
};
const StartLand = ({ position = [0, 0, 0] }: Props) => {
  const land = useGLTF("./model/float-land.glb");
  const setStage = useGame((state) => state.setStage);
  const { actions } = useAnimations(land.animations, land.scene);
  actions.growing?.play();
  if (actions["growing"]) {
    actions["growing"].clampWhenFinished = true;
    actions.growing?.setLoop(2201, 1);
  }

  return (
    <>
      <RigidBody
        type="fixed"
        position={position}
        onCollisionEnter={() => {
          setStage("playing");
        }}
      >
        <group scale={0.4}>
          <primitive object={land.scene} />
        </group>
      </RigidBody>
      <PressX position={[-2, 0, -5]} />
    </>
  );
};

export default StartLand;
