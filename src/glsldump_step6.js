// Filename: glsldump_step5.js  
// Timestamp: 2016.03.31-23:54:20 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// Using textures in WebGL
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL


const glsldump_load = require('./glsldump_load');

typeof require('sylvester/sylvester.src'),
typeof require('./glutils');

const glsldump_step5 = module.exports = (o => {

  var mvMatrix;
  var vertexPositionAttribute;
  //var vertexColorAttribute;
  var textureCoordAttribute;
  var perspectiveMatrix;

  var cubeTexture,
      cubeImage;

  var cubeVerticesBuffer,
      cubeVerticesColorBuffer,
      cubeVerticesIndexBuffer,
      cubeVerticesTextureCoordBuffer;

  // stored cube rotation
  var cubeRotation = 0.0,
      lastCubeUpdateTime = 0;

  //
  // start
  //
  // Called when the canvas is created to get the ball rolling.
  // Figuratively, that is. There's nothing moving in this demo.
  //
  o.start = canvaselem => {
    var gl = o.initWebGL(canvaselem),
        shaderProgram;
    
    if (gl) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
      gl.clearDepth(1.0);                 // Clear everything
      gl.enable(gl.DEPTH_TEST);           // Enable depth testing
      gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

      
      // Initialize the shaders; this is where all the lighting for the
      // vertices and so forth is established.      
      glsldump_load.getshaderarr(gl, [
        './src/shader/step6.frag',
        './src/shader/step6.vert'
      ], (err, [fragshader, vertshader]) => {
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

        textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(textureCoordAttribute);
        




        
        // Here's where we call the routine that builds all the objects
        // we'll be drawing.
        o.initBuffers(gl);

        o.initTextures(gl);
        
        // Set up to draw the scene periodically.
        setInterval(() => o.drawScene(gl, shaderProgram), 15);
      });
    }

  };

  //
  // initWebGL
  //
  // Initialize WebGL, returning the GL context or null if
  // WebGL isn't available or could not be initialized.
  //
  o.initWebGL = (canvaselem) => {
    try {
      return canvaselem.getContext("experimental-webgl");
    } catch (e) {
      throw new Error("Unable to initialize WebGL. Your browser may not support it.");      
    }
  };

  //
  // initBuffers
  //
  // Initialize the buffers we'll need. For this demo, we just have
  // one object -- a simple two-dimensional cube.
  //
  o.initBuffers = gl => {
    // Create a buffer for the cube's vertices.

    cubeVerticesBuffer = gl.createBuffer();

    // Select the cubeVerticesBuffer as the one to apply vertex
    // operations to from here out.

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);

    // Now create an array of vertices for the cube.
    var vertices = [
      // Front face
     -1.0, -1.0,  1.0,
      1.0, -1.0,  1.0,
      1.0,  1.0,  1.0,
     -1.0,  1.0,  1.0,
      
      // Back face
     -1.0, -1.0, -1.0,
     -1.0,  1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0, -1.0, -1.0,
      
      // Top face
     -1.0,  1.0, -1.0,
     -1.0,  1.0,  1.0,
      1.0,  1.0,  1.0,
      1.0,  1.0, -1.0,
      
      // Bottom face
     -1.0, -1.0, -1.0,
      1.0, -1.0, -1.0,
      1.0, -1.0,  1.0,
     -1.0, -1.0,  1.0,
     
      // Right face
      1.0, -1.0, -1.0,
      1.0,  1.0, -1.0,
      1.0,  1.0,  1.0,
      1.0, -1.0,  1.0,
      
      // Left face
     -1.0, -1.0, -1.0,
     -1.0, -1.0,  1.0,
     -1.0,  1.0,  1.0,
     -1.0,  1.0, -1.0
    ];

    // Now pass the list of vertices into WebGL to build the shape. We
    // do this by creating a Float32Array from the JavaScript array,
    // then use it to fill the current vertex buffer.

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Now set up the colors for the faces. We'll use solid colors
    // for each face.

    
    //var colors = [
    //  [1.0,  1.0,  1.0,  1.0],    // Front face: white
    //  [1.0,  0.0,  0.0,  1.0],    // Back face: red
    //  [0.0,  1.0,  0.0,  1.0],    // Top face: green
    //  [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    //  [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    //  [1.0,  0.0,  1.0,  1.0]     // Left face: purple
    //];
    //
    // Convert the array of colors into a table for all the vertices.
    //
    //var generatedColors = [];
    //
    //for (var j=0; j<6; j++) {
    //  var c = colors[j];
    //  
    //  // Repeat each color four times for the four vertices of the face
    //
    //  for (var i=0; i<4; i++) {
    //    generatedColors = generatedColors.concat(c);
    //  }
    //}
    //
    //cubeVerticesColorBuffer = gl.createBuffer();
    //gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesColorBuffer);
    //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(generatedColors), gl.STATIC_DRAW);

    cubeVerticesTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);

    var textureCoordinates = [
      // Front
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Back
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Top
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Bottom
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Right
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0,
      // Left
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.0
    ];    

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);
    
    // Build the element array buffer; this specifies the indices
    // into the vertex array for each face's vertices.

    cubeVerticesIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    var cubeVertexIndices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23    // left
    ];

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);

  
  };

  //
  // drawScene
  //
  // Draw the scene.
  //
  o.drawScene = (gl, shaderProgram) => {
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
    // drawing the cube.

    o.mvTranslate([-0.0, 0.0, -6.0]);


    // rotate before draw
    o.mvPushMatrix();
    o.mvRotate(cubeRotation, [1, 0, 1]);
//    o.mvTranslate([cubeXOffset, cubeYOffset, cubeZOffset]);    
    

    // Draw the cube by binding the array buffer to the cube's vertices
    // array, setting attributes, and pushing it to GL.

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    // Set the texture coordinates attribute for the vertices.

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    // Specify the texture to map onto the faces.

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, cubeTexture);
    gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);

    // Draw the cube.

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVerticesIndexBuffer);
    o.setMatrixUniforms(gl, shaderProgram);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);    
    
    //o.setMatrixUniforms(gl, shaderProgram);
    //gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Restore the original matrix

    o.mvPopMatrix();

    var currentTime = Date.now();
    if (lastCubeUpdateTime) {
      var delta = currentTime - lastCubeUpdateTime;
      
      cubeRotation += (30 * delta) / 1000.0;
      
      //cubeXOffset += xIncValue * ((30 * delta) / 1000.0);
      //cubeYOffset += yIncValue * ((30 * delta) / 1000.0);
      //cubeZOffset += zIncValue * ((30 * delta) / 1000.0);
      //
      //if (Math.abs(cubeYOffset) > 2.5) {
      //  xIncValue = -xIncValue;
      //  yIncValue = -yIncValue;
      //  zIncValue = -zIncValue;
      //}
      
    }
    
    lastCubeUpdateTime = currentTime;    
    
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

  o.setMatrixUniforms = (gl, shaderProgram) => {
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
  };



  // This example uses a few additional matrix operations, including two
  // routines to push and pop matrices from a stack to preserve them, and one
  // that rotates a matrix a given number of degrees. These follow, for your
  // reference:

  var mvMatrixStack = [];

  o.mvPushMatrix = m => {
    if (m) {
      mvMatrixStack.push(m.dup());
      mvMatrix = m.dup();
    } else {
      mvMatrixStack.push(mvMatrix.dup());
    }
  };

  o.mvPopMatrix = () => {
    if (!mvMatrixStack.length) {
      throw("Can't pop from an empty matrix stack.");
    }
    
    mvMatrix = mvMatrixStack.pop();
    return mvMatrix;
  };

  o.mvRotate = (angle, v) => {
    var inRadians = angle * Math.PI / 180.0;
    
    var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
    o.multMatrix(m);
  };


  o.initTextures = (gl) => {
    cubeTexture = gl.createTexture();
    cubeImage = new Image();
    cubeImage.onload = () => {
      o.handleTextureLoaded(gl, cubeImage, cubeTexture);
    };
    cubeImage.src = './src/img/cubetexture.png';
  };

  o.handleTextureLoaded = (gl, image, texture) => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
  };
  

  return o;

})({});
