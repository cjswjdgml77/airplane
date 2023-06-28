varying vec2 vUv;
varying vec3 vCoord;
uniform float uTime;
attribute float aScale;
void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;
    gl_Position = projectPosition;
    gl_PointSize = 50.0 * aScale ;
    gl_PointSize *= (1.0 / - viewPosition.z);
    vUv = uv;
    vCoord = position;
}