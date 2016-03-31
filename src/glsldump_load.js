// Filename: glsldump_load.js  
// Timestamp: 2016.03.30-17:12:48 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  
//
// fragment loader: glsl|vert|frag|geom

const superagent = require('superagent'),
      rxjs = require('rxjs');

const glsldump_load = module.exports = (o => {

  o.getsource = (path, fn) => (
    superagent.get(path).type('text').end((err, xhr) => (
      fn(err, err || xhr.text)
    ))
  );
  
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
