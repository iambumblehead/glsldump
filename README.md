glsldump
========

![webgllogo](https://i0.wp.com/www.iontom.com/wp-content/uploads/2014/03/webgl1.png?w=400)

dump files for [glsl experimentation][0].

 1. [Getting Started][4]
 2. [Adding 2D content to a WebGL context][5]
 3. [Using shaders to apply color in WebGL][6]
 4. [Animating objects with WebGL][7]
 5. [Creating 3D objects using WebGL][8]
 6. [Using Textures in WebGL][9]
 7. [Lighting in WebGL][10]
 8. [Animating textures in WebGL][11] ([addl. download][12] required)


other,

 1. [Mozilla A-frame][20] (npm download for this is _big_)


------------------------------------------------

DONE

 * xhr load of vert and frag sources

TODO

 * create staged x/y animation (2d)
 * identify vert and frag sources dynamically (check for `gl_FragColor` or `gl_Position`
 * mock xhr requests at test directory
 * convert frag loader to use rxjs

------------------------------------------------

Other,

 * [http://acko.net/][1]
 * [matrix math][2]


![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 


[0]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Getting_started_with_WebGL "webgl getting started"
[1]: http://acko.net/ "acko.net"
[2]: http://joshua.smcvt.edu/linalg.html/book.pdf
[4]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step1.js "step1"
[5]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step2.js "step2"
[6]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step3.js "step3"
[7]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step4.js "step4"
[8]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step5.js "step5"
[9]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step6.js "step6"
[10]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step7.js "step7"
[11]: https://github.com/iambumblehead/glsldump/blob/master/src/glsldump_step8.js "step8"
[12]: http://mdn.github.io/webgl-examples/tutorial/sample8/Firefox.ogv "Firefox.ogv"

[20]: https://aframe.io/ "mozilla a-frame"

<!--
https://github.com/codecruzer/webgl-shader-loader-js
https://github.com/MarkusSprunck/webgl-hello-world

https://bugs.chromium.org/p/chromium/issues/detail?id=180632
http://programmers.stackexchange.com/questions/289857/is-progressive-http-download-a-viable-alternative-to-hls-dash-rtmp-for-providing
https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP
-->
