varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;
  
uniform sampler2D uSampler;

// The fragment shader now needs to be updated to take into account the lighting
// value computed by the vertex shader.
//
// Here we fetch the color of the texel, just like we did in the previous
// example, but before setting the color of the fragment, we multiply the
// texel's color by the lighting value to adjust the texel's color to take into
// account the effect of our light sources.

void main(void) {
  mediump vec4 texelColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    
  gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
}
