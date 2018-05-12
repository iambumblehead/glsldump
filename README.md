glsldump
========

![webgllogo][30]

Note: the path ahead for WebGL is unclear. There are two or three different future replacemnts being discussed and the general consensus is that current WebGL is lacking and in need of improvement, as seen in [this quora response.][31] A remark on lack of activity around servo's WebGPU implementation [here,](https://github.com/kvark/webgpu-servo)

 * "At this point, since there is no consensus on the shape of the API or even the concrete feature set/programming model, we decided to focus on the low-level graphics abstraction layer ([1][32]) instead of pushing the WebGPU-Servo prototype further. This can change once things clear up a bit."

For more details check [here][34] and [here.][36]

---

dump files for [glsl experimentation.][0]

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
 2. https://pomax.github.io/bezierinfo/
 3. [http://acko.net/][1]
 4. [matrix math][2]
 


[30]: https://github.com/iambumblehead/glsldump/raw/master/src/img/300px-WebGL_Logo.svg.png "gl-logo"
[31]: https://www.quora.com/Should-I-use-WebGL-to-learn-shader-programming "should I learn webgl?"
[32]: http://github.com/gfx-rs/gfx
[33]: http://kvark.github.io/web/gpu/2018/02/10/low-level-gpu-web.html
[34]: http://kvark.github.io/ "kvark"
[35]: https://lists.w3.org/Archives/Public/public-gpu/2017Sep/0015.html
[36]: https://lists.w3.org/Archives/Public/public-gpu/ "public-gpu"

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
