var moment = require("moment");
var GetRate = require("./get-rate");

var usdRate = "";

var requestRate = function () {
    GetRate(function (err, rate) {
        if (!err) {
            usdRate = rate;
        }
    });
};

requestRate();
setInterval(requestRate, 60000);

setInterval(function () {
    var time = moment().format("HHmm");
    var rate = (usdRate + "").replace(".", "");
    console.log(time + rate);
}, 1000);