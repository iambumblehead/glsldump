// Filename: glsldump_step1.js  
// Timestamp: 2016.03.29-23:43:21 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var glsldump_step1 = module.exports = (o => {
  
  o.initWebGL = canvas => {
    var gl = null;
    
    try {
      // Try to grab the standard context. If it fails, fallback to experimental.
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {}
    
    // If we don't have a GL context, give up now
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
      gl = null;
    }
    
    return gl;
  };

  o.start = (canvaselem) => {
    // Initialize the GL context
    var gl = o.initWebGL(canvaselem);
    
    // Only continue if WebGL is available and working
    
    if (gl) {
      // Set clear color to black, fully opaque
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Enable depth testing
      gl.enable(gl.DEPTH_TEST);
      // Near things obscure far things
      gl.depthFunc(gl.LEQUAL);
      // Clear the color as well as the depth buffer.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  };

  return o;

})({});
