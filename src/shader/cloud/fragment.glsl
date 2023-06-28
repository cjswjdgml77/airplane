varying vec2 vUv;
varying vec3 vCoord;


void main(){

    // float strength = 1.0 - step(0.4,distance(vUv , vec2(0.5)));
    //  vec3 strength = vCoord;
    // vec2 strength = distance(vCoord.xy, vec2(0.5));
    float strength = distance(gl_PointCoord, vec2(0.5));
    gl_FragColor = vec4(1.0,0.0,0.0,strength);
}