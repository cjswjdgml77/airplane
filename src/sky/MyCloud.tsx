import { useTexture } from "@react-three/drei";
import FacingCamera from "../component/FacingCamera";
import { road, cloud } from "../game";
const MyCloud = () => {
  const count = 30;

  const texture = useTexture("./textures/cloud.png");

  // return null;
  return (
    <>
      {/* <Cloud width={0.5} /> */}
      {[...new Array(count)].map((data, idx) => (
        <group
          position={[
            Math.random() < 0.5
              ? Math.random() * -road.endPoint
              : Math.random() * road.endPoint,
            Math.random(),
            Math.random() * -100,
          ]}
          scale={Math.random() * cloud.maxScale}
          key={idx}
        >
          <FacingCamera>
            <mesh>
              <planeGeometry args={[10, 10, 100, 100]} />
              <meshStandardMaterial
                map={texture}
                color={"#ffffff"}
                transparent
                depthTest
                opacity={cloud.opacity}
              />
            </mesh>
          </FacingCamera>
        </group>
      ))}
      <group scale={7}></group>
    </>
  );
};

export default MyCloud;
