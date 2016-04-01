// Filename: glsldump.js  
// Timestamp: 2016.04.01-00:08:41 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const glsldump_load = require('./glsldump_load'),
      glsldump_step1 = require('./glsldump_step1'),
      glsldump_step2 = require('./glsldump_step2'),
      glsldump_step3 = require('./glsldump_step3'),
      glsldump_step4 = require('./glsldump_step4'),
      glsldump_step5 = require('./glsldump_step5'),
      glsldump_step6 = require('./glsldump_step6'),
      glsldump_step7 = require('./glsldump_step7'),
      superagent = require('superagent');

const rootelem = document.getElementById('root'),
      canvaselem = document.createElement('canvas');

canvaselem.width  = 640;
canvaselem.height = 480;

rootelem.appendChild(canvaselem);

// define step here manually
glsldump_step7.start(canvaselem);
