
var Tick = require("./index.js");
var b = new Tick(128);
b.register('beat', function (x) { console.log("bam");   });
b.register('bar' , function (x) { console.log("badam"); });
b.play();
