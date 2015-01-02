## How to use it

    var Tick = requrie("bpm-tick");
    var b = new Tick(128);
    b.register('beat', function (x) { console.log("bam");   });
    b.register('bar' , function (x) { console.log("badam"); });
    b.play();

It uses `Date` so it shouldn't drift (aka. it won't fall out of tempo). It's not
guaranteed to be 100% precise on the note though.

## Available callbacks

You can register any of these:

    Word key    Power key     Number (res. available)

    sub         1/64          0
    div         1/16          1
    beat        1/4           2
    bar         1             3
    word        4             4
    verse       16            5
    song        64            6
   

Registering `beat`, `1/4`, and `2` are exaclty the same thing. 
Registration overwrites.

## Resolution

By default, resolution 2 is used. You can set your own resolution with

    var b = beat(128 [, resolution]);

where `resolution` is an integer from 0 to 6.

At resolution 2, only callbacks for `beat` (`1/4`) and longer are called. To get
`sub` (`1/64`) resolutions to be be called, you have to use resolution 0. (See
table above)


## Other stuff
  
  `b.on` is an alias for `b.register`. 

  `b.devlog = true` will log numbers.
