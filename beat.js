// 
// var Beat = (function () {
//     function Beat(bpm) {
//         this.bpm = bpm;
//         // [0] sub = 1/32,
//         // [1] div = 1/16th, 
//         // [2] beat = 1/4er, 
//         // [3] bar = 1, 
//         // [4] word = 4, 
//         // [5] verse = 16, 
//         // [6] song = 64
//         this.callbacks = [null, null, null, null, null, null, null];
//         this._counters = [0, 0, 0, 0, 0, 0, 0];
// 
//         // Resolution 0 = max, counters.length = min. base = 2.
//         this.resolution = 3;
// 
// 
//         this.delay = (1 / (bpm / 60000)) /* <- Onbeat. Res -> */ / Math.pow(4, 3 - this.resolution);
// 
//     }
// 
//     Beat.prototype.play = function () {
//         this.timer = setTimeout(this.tick.bind(this), this.delay);
//     };
// 
//     Beat.prototype.tick = function () {
// 
//         // Update counters as needed.
// 
//         var l = this._counters.length; // Evaluate length only once for max perf.
// 
//         var mkr = this.resolution;
//         while (mkr < l && ++this._counters[mkr] == 4) {
//             this._counters[mkr++] = 0;
//         };
// 
//         //while (i > 0) {
//         //    if (++this._counters[l-i] == 4) {
//         //        this._counters[l-(i)] = 0;
//         //        if(typeof this.callbacks[l-i] === 'function') this.callbacks[l-i]();
//         //    };
//         //    --i;
//         //}
//         console.log(this._counters);
// 
//         this.timer = setTimeout(this.tick.bind(this), this.delay);
// 
//     };
// 
//     Beat.prototype.register = function(event, callback) {
//         // body...
//     };
// 
//     return Beat;
// })();



var Tempo = (function () {
    function Tempo(bpm) {
        this.bpm = bpm;
        // [0] sub = 1/32,
        // [1] div = 1/16th, 
        // [2] beat = 1/4er, 
        // [3] bar = 1, 
        // [4] word = 4, 
        // [5] verse = 16, 
        // [6] song = 64
        // 
        
        this.callbacks = [null, null, null, null, null, null, null];
        this.ticker = 0;

        this.resolution = 3;
        this.delay = (1 / (bpm / 60000)) /* <- Onbeat. Res -> */ / Math.pow(4, 3 - this.resolution);

    }

    Tempo.prototype.play = function () {
        this.timer = setTimeout(this.tick.bind(this), this.delay);
    };

    Tempo.prototype.tick = function () {

        this.ticker++;

        var n = 0; var log = this.ticker / 4 >> 0;
        while ((n = this.ticker / 4 >> 0) > 3) {
            console.log('hi')
            log = log + ' ' + (this.ticker / Math.pow(4, n) >> 0) % Math.pow(4, n+1);
            n++;
        }
        console.log(log)
        // console.log(this.ticker % 4, (this.ticker / 4 >> 0) % 16);

        this.timer = setTimeout(this.tick.bind(this), this.delay);
    };

    Tempo.prototype.getTime = function() {
        return this.ticker;
    };

    Tempo.prototype.register = function(event, callback) {
        // body...
    };

    return Tempo;
})();



var b = new Tempo(120);
b.play();