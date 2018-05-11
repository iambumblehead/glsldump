// Filename: express.js  
// Timestamp: 2016.03.29-22:27:25 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

const isserver_render = true,
      rcp = require('recursive-copy'),
      scroungejs = require('scroungejs'),
      express = require('express'),
      nodefs = require('node-fs'),
      http = require('http'),
      path = require('path'),
      fs = require( 'fs' ),
      port = 3000,
      app = express();


const copyDir = ( inputpath, outputpath ) => {
  fs.stat( inputpath, ( err, stat ) => {
    if ( stat && stat.isDirectory() ) {
      nodefs.mkdir( outputpath, 755, true, err => {
        if ( err ) {
          console.error( err );
          return;
        }

        rcp( inputpath, outputpath, { overwrite: true }, err => {
          if ( err ) return console.error( err );

          return console.log( `[...] done copying ${outputpath}` );
        });
      });
    } else {
      console.log( `[...] nothing to copy ${inputpath}` );
    }
  });
};

copyDir('./src/img', './public/img');
copyDir('./src/shader', './public/shader');
copyDir('./src/video', './public/video');

scroungejs.build({
  inputpath  : './src/',
  outputpath : './public/',
  publicpath : '/glsldump/',    
  iscompress : false,
  isconcat   : false,
  basepagein : './src/index.tpl.html',
  basepage   : './public/index.html',
  prependarr : [ {
    treename : 'glsldump.js',
    sourcearr : [
      './src/sylvester.src.js',
      './src/glutils.js'
    ]
  } ],
  treearr : [
    'glsldump.js',
    'glsldump.css'
  ]
}, function (err, res) {
  if (err) throw new Error(err);

  app.use('/glsldump/', express.static(path.join(__dirname, 'public')));
  http.createServer(app).listen(port);
    
  console.log(`[...] localhost:${port}/glsldump/`);
});
