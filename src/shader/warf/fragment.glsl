varying vec2 vUv;
varying vec3 vCoord;
uniform float uTime;
uniform float uFrequency;
uniform vec3 uColor;
void main(){
    //0.478,0.761
    float strength = 1.0- vCoord.y/0.367111 ;
    float dis =  distance(vCoord.xz, vec2(0.0)) /0.8 ;
    // strength *= abs(cos(uTime * uFrequency));
    // float strength = pow( vCoord.y,2.0)*-1.0 + 0.8;
    gl_FragColor = vec4(uColor, strength * dis  );
}