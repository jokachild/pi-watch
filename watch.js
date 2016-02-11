var Five = require("johnny-five");
var Raspi = require("raspi-io");
var Minfin = require("./minfin");


var usdRate = "0000";

var requestRate = function () {
    Minfin.GetRate("usd", function (err, rate) {
        if (!err) {
            usdRate = rate;
        }
    });
};

requestRate();
setInterval(requestRate, 60000);

var board = new Five.Board({
    io: new Raspi()
});

board.on("ready", function() {
    var digits = new Five.Led.Digits({
        pins: {
            data: "P1-11",
            cs: "P1-12",
            clock: "P1-13"
        }
    });

    setInterval(function() {
        digits.print("US  " + usdRate);
    }, 5000);
});
