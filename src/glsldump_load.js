// Filename: glsldump_load.js  
// Timestamp: 2016.03.31-22:46:54 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// fragment loader: vert|frag
//
// all vert definitions define `gl_Position`,
// all frag definitions define `gl_FragColor`
//
// verify shader via path extension should be removed.
// each shader composed of minimum one vert and one frag,
//
//   http://www.html5rocks.com/en/tutorials/webgl/shaders/
//   http://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html
//   https://stackoverflow.com/questions/26092600/sending-javascript-variables-to-fragment-shader

const glsldump_load = module.exports = (o => {
  o.getsource = (path, fn) => {
    let request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400)
        fn(null, request.responseText);
    };
    request.send();
  };
  
  o.getsourcearr = (patharr, fn, filterfn, sourcearr = []) => {
    if (patharr.length) {
      o.getsourcearr(patharr.slice(1), (err, sourcearr) => {
        if (err) return fn(err);
        
        o.getsource(patharr[0], (err, source) => {
          if (err) return fn(err);

          source = filterfn ? filterfn(patharr[0], source) : source;
          sourcearr.push(source);
          fn(null, sourcearr);
          
        });
      }, filterfn, sourcearr);
    } else {
      fn(null, sourcearr);
    }
  };

  o.getshader = (gl, path, source) => {
    var match = path.match(/(vert|frag)$/),
        extn = match && match[0],
        shader;

    if (!extn) {
      throw new Error('invalid shader path: ', path);
    } else if (extn === 'vert') {
      shader = gl.createShader(gl.VERTEX_SHADER);
    } else if (extn === 'frag') {
      shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error("error compiling shader: " + gl.getShaderInfoLog(shader));
    }
    
    return shader;    
  };
  
  o.getshaderarr = (gl, patharr, fn) => {
    o.getsourcearr(patharr, fn, (path, source) => (
      o.getshader(gl, path, source)
    ));
  };
  
  return o;
  
})({});
