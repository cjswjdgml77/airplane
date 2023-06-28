import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Lights from "./Lights";
import { Physics } from "@react-three/rapier";
import AirPlane from "./player/AirPlane";
import Road from "./road/Road";
import MyCloud from "./sky/MyCloud";
import EndPoint from "./endpoint/EndPoint";

const App = () => {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "up", keys: ["KeyZ", "KeyN"] },
          { name: "down", keys: ["KeyX", "KeyM"] },
        ]}
      >
        <Canvas shadows>
          <OrbitControls />
          <Physics gravity={[0, 0, 0]}>
            <Lights />
            <AirPlane />
            <Road />
            <MyCloud />
            <EndPoint />
          </Physics>
        </Canvas>
      </KeyboardControls>
      <p id="copy">Airplane by Poly by Google [CC-BY] via Poly Pizza</p>
    </>
  );
};

export default App;
