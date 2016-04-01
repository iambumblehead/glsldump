attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
    
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
      
varying highp vec2 vTextureCoord;

// The key change here is that instead of fetching the vertex color, we're
// setting the texture coordinates; this will indicate the location within the
// texture corresponding to the vertex.

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
}
