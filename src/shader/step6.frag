varying highp vec2 vTextureCoord;
      
uniform sampler2D uSampler;

// Instead of assigning a color value to the fragment's color, the fragment's
// color is computed by fetching the texel (that is, the pixel within the
// texture) that the sampler says best maps to the fragment's position.

void main(void) {
  gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
}
