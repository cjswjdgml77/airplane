import { shaderMaterial } from "@react-three/drei";
import { ShaderMaterialProps } from "@react-three/fiber";
import * as THREE from "three";
const WarfShader = shaderMaterial(
  { uColor: new THREE.Color(1.0, 0.38, 0.369) },
  //vertext shader
  /*glsl */ `
        varying vec3 vCoord;
        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectPosition = projectionMatrix * viewPosition;
            gl_Position = projectPosition;
            vCoord = position;
        }
    `,
  // fragment shader
  /*glsl */ `
    varying vec3 vCoord;
    uniform vec3 uColor;
    void main(){
        float strength = 1.0- vCoord.y/0.367111 ;
        float dis =  distance(vCoord.xz, vec2(0.0)) /0.8 ;
        gl_FragColor = vec4(uColor, strength * dis  );
    }
    `
);
// WarfShader.call(this, { transparent: true });
declare module "@react-three/fiber" {
  interface ThreeElements {
    warfShader: ShaderMaterialProps;
  }
}
export default WarfShader;
