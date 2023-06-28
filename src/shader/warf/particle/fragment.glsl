varying vec2 vUv;
varying vec3 vCoord;
uniform vec3 uColor;
void main(){
    // float strength = step(0.0, vCoord.y);
    float strength = 1.0;
    gl_FragColor = vec4(uColor, strength  );
}