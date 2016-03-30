// Filename: glsldump.js  
// Timestamp: 2016.03.30-00:00:03 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const glsldump_step1 = require('./glsldump_step1'),
      glsldump_step2 = require('./glsldump_step2');

const rootelem = document.getElementById('root'),
      canvaselem = document.createElement('canvas');

canvaselem.width  = 640;
canvaselem.height = 480;

rootelem.appendChild(canvaselem);


glsldump_step2.start(canvaselem);
