// Filename: glsldump_step2.js  
// Timestamp: 2016.03.30-15:46:48 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  


const glsldump_load = require('./glsldump_load');

typeof require('sylvester/sylvester.src'),
typeof require('./glutils');


const glsldump = module.exports = (o => {
  var canvas;
  var gl;
  var squareVerticesBuffer;
  var mvMatrix;
  var shaderProgram;
  var vertexPositionAttribute;
  var perspectiveMatrix;

  //
  // start
  //
  // Called when the canvas is created to get the ball rolling.
  // Figuratively, that is. There's nothing moving in this demo.
  //
  o.start = canvaselem => {

    canvas = canvaselem;
    
    o.initWebGL(canvas);

    // Only continue if WebGL is available and working
    
    if (gl) {
      glsldump_load.getshaderarr([
        './src/shader/step2.frag',
        './src/shader/step2.vert'
      ], gl, (err, [fragshader, vertshader]) => {
        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertshader);
        gl.attachShader(shaderProgram, fragshader);
        gl.linkProgram(shaderProgram);

        // If creating the shader program failed, alert

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert("Unable to initialize the shader program.");
        }

        gl.useProgram(shaderProgram);

        vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(vertexPositionAttribute);

        /////////////////////////// added above
        ////////////////////////////////////////
        

        
        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Initialize the shaders; this is where all the lighting for the
        // vertices and so forth is established.

        //o.initShaders();

        // Here's where we call the routine that builds all the objects
        // we'll be drawing.

        o.initBuffers();

        // Set up to draw the scene periodically.

        o.drawScene();

        //setInterval(o.drawScene, 15);
      });
    }

  };

  //
  // initWebGL
  //
  // Initialize WebGL, returning the GL context or null if
  // WebGL isn't available or could not be initialized.
  //
  o.initWebGL = () => {
    gl = null;

    try {
      gl = canvas.getContext("experimental-webgl");
    }
    catch(e) {
    }

    // If we don't have a GL context, give up now

    if (!gl) {
      alert("Unable to initialize WebGL. Your browser may not support it.");
    }
  };

  //
  // initBuffers
  //
  // Initialize the buffers we'll need. For this demo, we just have
  // one object -- a simple two-dimensional square.
  //
  o.initBuffers = () => {

    // Create a buffer for the square's vertices.

    squareVerticesBuffer = gl.createBuffer();

    // Select the squareVerticesBuffer as the one to apply vertex
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

    // Now create an array of vertices for the square. Note that the Z
    // coordinate is always 0 here.

    var vertices = [
      1.0,  1.0,  0.0,
        -1.0, 1.0,  0.0,
      1.0,  -1.0, 0.0,
        -1.0, -1.0, 0.0
    ];

    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  };

  //
  // drawScene
  //
  // Draw the scene.
  //
  o.drawScene = () => {
    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Establish the perspective with which we want to view the
    // scene. Our field of view is 45 degrees, with a width/height
    // ratio of 640:480, and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    perspectiveMatrix = makePerspective(45, 640.0/480.0, 0.1, 100.0);

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.

    o.loadIdentity();

    // Now move the drawing position a bit to where we want to start
    // drawing the square.

    o.mvTranslate([-0.0, 0.0, -6.0]);

    // Draw the square by binding the array buffer to the square's vertices
    // array, setting attributes, and pushing it to GL.

    gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    o.setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  //
  // initShaders
  //
  // Initialize the shaders, so WebGL knows how to light our scene.
  //
  o.initShaders = () => {
    // here get shader...
    // http://stackoverflow.com/questions/14219947/why-do-shaders-have-to-be-in-html-file-for-webgl-program
    
    var fragmentShader = o.getShader(gl, "shader-fs");
    var vertexShader = o.getShader(gl, "shader-vs");

    // Create the shader program

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Unable to initialize the shader program.");
    }

    gl.useProgram(shaderProgram);

    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
  };


  //
  // Matrix utility functions
  //

  o.loadIdentity = () => {
    mvMatrix = Matrix.I(4);
  };

  o.multMatrix = m => {
    mvMatrix = mvMatrix.x(m);
  };

  o.mvTranslate = v => {
    o.multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
  };

  o.setMatrixUniforms = () => {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  };

  return o;

})({});
