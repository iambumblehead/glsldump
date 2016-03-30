// Filename: glsldump.js  
// Timestamp: 2016.03.30-15:50:32 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const glsldump_load = require('./glsldump_load'),
      glsldump_step1 = require('./glsldump_step1'),
      glsldump_step2 = require('./glsldump_step2'),
      superagent = require('superagent');

const rootelem = document.getElementById('root'),
      canvaselem = document.createElement('canvas');

canvaselem.width  = 640;
canvaselem.height = 480;

rootelem.appendChild(canvaselem);

glsldump_step2.start(canvaselem);
