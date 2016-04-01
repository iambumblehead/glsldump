attribute highp vec3 aVertexNormal;
attribute highp vec3 aVertexPosition;
attribute highp vec2 aTextureCoord;

uniform highp mat4 uNormalMatrix;
uniform highp mat4 uMVMatrix;
uniform highp mat4 uPMatrix;
  
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

// The first thing to do is update the vertex shader so it generates a shading
// value for each vertex based on the ambient lighting as well as the
// directional lighting.
//
// Once the position of the vertex is computed, and we obtain the coordinates
// of the texel corresponding to the vertex, we can work on computing the
// shading for the vertex.
//
// The first thing we do is transform the normal based on the current position
// and orientation of the cube, by multiplying the vertex's normal by the
// normal matrix. We can then compute the amount of directional lighting that
// needs to be applied to the vertex by calculating the dot product of the
// transformed normal and the directional vector (that is, the direction from
// which the light is coming). If this value is less than zero, then we pin
// the value to zero, since you can't have less than zero light.
//
// Once the amount of directional lighting is computed, we can generate the
// lighting value by taking the ambient light and adding in the product of the
// directional light's color and the amount of directional lighting to provide.
// As a result, we now have an RGB value that will be used by the fragment
// shader to adjust the color of each pixel we render.

void main(void) {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
    
  // Apply lighting effect
    
  highp vec3 ambientLight = vec3(0.6, 0.6, 0.6);
  highp vec3 directionalLightColor = vec3(0.5, 0.5, 0.75);
  highp vec3 directionalVector = vec3(0.85, 0.8, 0.75);
    
  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
    
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
  vLighting = ambientLight + (directionalLightColor * directional);
}
