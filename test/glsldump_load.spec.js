// Filename: glsldump_load.spec.js  
// Timestamp: 2016.03.30-16:29:35 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>  

const glsldump_load = require('../src/glsldump_load'),
      glcreate = require('gl'),
      fs = require('fs');

const test_fragpath = './test/shader/test1.frag';

describe("glsldump_load.getshader", () => {
  it("should return a fragment shader", () => {
    const gl = glcreate(640, 480, { preserveDrawingBuffer: true }),
          frag_shadersrc = fs.readFileSync(test_fragpath, 'ascii'),
          frag_shader = glsldump_load.getshader(gl, test_fragpath, frag_shadersrc);
    
    expect( frag_shader._type ).toBe( gl.FRAGMENT_SHADER );
  });
});
