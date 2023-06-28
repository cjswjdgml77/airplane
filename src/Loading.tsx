import { Html, useProgress } from "@react-three/drei";

const Loading = () => {
  const { progress } = useProgress();
  return <Html center>Loading {progress}%</Html>;
};

export default Loading;
