// Filename: express.js  
// Timestamp: 2016.03.29-22:27:25 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>

var fs = require('fs'),
    express = require('express'),
    morgan = require('morgan'),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    serveIndex = require('serve-index'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    errorhandler = require('errorhandler'),
    methodOverride = require('method-override'),
    scroungejs = require('scroungejs'),
    port = 3000,
    app = express();

scroungejs.build({
  inputpath      : './src/',
  outputpath     : './serv/www/',
  publicpath     : './www',    
  iscompressed   : false,
  isconcatenated : true,
  basepage       : './serv/index.html',
  treearr : [
    'glsldump.js',
    'glsldump.css'
  ]
}, function (err, res) {
  if (err) throw new Error(err);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.get('/', (req, res, fn) => {
    fs.readFile('./serv/index.html', 'utf-8', (err, content) => {
      res.end(content);
    });    
  });

  app.use('/src', express.static(__dirname + '/../src'));
  app.use('/www', express.static(__dirname + '/www'));
  app.use(errorhandler({
    dumpExceptions : true, 
    showStack : true
  }));  
  
  app.listen(port, 'localhost', err => {
    if (err) console.err(err);
    else console.log(`listening on http://localhost:${ port }`);
  });
});
