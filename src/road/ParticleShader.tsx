import { shaderMaterial } from "@react-three/drei";
import { Object3DNode } from "@react-three/fiber";
import * as THREE from "three";

const ParticleShader = shaderMaterial(
  { uColor: new THREE.Color(1.0, 0.38, 0.369) },
  // vertex shader
  /*glsl*/ `
        varying vec3 vCoord;
        attribute float aScale;
        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectPosition = projectionMatrix * viewPosition;
            gl_Position = projectPosition;
            gl_PointSize = 50.0 * aScale ;
            gl_PointSize *= (1.0 / - viewPosition.z);
        }
    `,
  // fragment shader
  /*glsl*/ `
        uniform vec3 uColor;
        void main(){
            gl_FragColor = vec4(uColor, 1.0  );
        }
    `
);
declare module "@react-three/fiber" {
  interface ThreeElements {
    particleShader: Object3DNode<typeof ParticleShader, typeof ParticleShader>;
  }
}
export default ParticleShader;
