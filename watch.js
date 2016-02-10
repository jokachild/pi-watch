var Five = require("johnny-five");
var Raspi = require("raspi-io");
var GetRate = require("./get-rate");


var usdRate = "0000";

var requestRate = function () {
    GetRate(function (err, rate) {
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
    }, 1000);
});
