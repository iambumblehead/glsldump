// Filename: glsldump_aframe1.js  
// Timestamp: 2016.04.01-00:32:40 (last modified)
// Author(s): bumblehead <chris@bumblehead.com>
//
// commissioned project that uses a-frame: http://www.360syria.com/
//
// a-frame is a *huge* download and relies on things like webvr-polyfill
// thus a-frame should be considered 'unstable'. browser warnings about
// prototype methods added/redefined.
//
// a-frame proactively fills the screen regardless of container boundaries.
//

const aframe = require('aframe');

const glsldump_aframe1 = module.exports = (o => {

  o.start = canvaselem => {

    /*
    var aframehtml = [
      '<a-scene>',
      '  <a-box color="#6173F4" width="4" height="10" depth="2"></a-box>',
      '</a-scene>'
    ].join('\n');
     */

    var aframehtml = [
      '<a-scene>',
      '  <a-box color="#6173F4" width="4" height="10" depth="2"',
      '         position="-10 2 -5" rotation="0 0 45" scale="2 0.5 3">',
      '  </a-box>',
      '</a-scene>'
    ].join('\n');

    canvaselem.parentNode.innerHTML = aframehtml;

    console.log('aframe is ', aframe);
  };

  return o;
  
})({});
