// Filename: glsldump.js  
// Timestamp: 2016.04.01-01:05:16 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const glsldump_step6 = require('./glsldump_step6'),

      rootelem = document.getElementById('root'),
      canvaselem = document.createElement('canvas');

canvaselem.width  = 640;
canvaselem.height = 480;

rootelem.appendChild(canvaselem);

// define step here manually
glsldump_step6.start(canvaselem);
