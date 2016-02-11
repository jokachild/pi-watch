var _ = require("lodash");
var Minfin = require("./minfin");

var rates = {
    usd: "00.00",
    eur: "00.00"
};

var index = 0;
var currencies = _.keys(rates);

var requestRate = function () {
    var i = index >= currencies.length ? 0 : index;
    index++;
    Minfin.GetRate(currencies[i], function (err, rate) {
        if (!err) {
            rates[currencies[i]] = rate;
        }
    });
};

var curUSD = rates.usd;
var curEUR = rates.eur;

requestRate();
setInterval(requestRate, 30000);

var displayIndex = -1;

var redraw = function () {
    var us = rates.usd;
    var eu = rates.eur;
    var str = displayIndex > 0 ?
        "US " + curUSD + " EU  " + eu :
        "EU " + curEUR + " US  " + us;
    curUSD = us;
    curEUR = eu;
    console.log(str);
    var shift = 0;
    for (var i = 0; i < 8; i++) {
        setTimeout(function (i) {
            var newStr = str.substr(i + 1);
            newStr[0] == "." && (shift = 1);
            console.log(newStr.substr(shift));
        }.bind(null, i), i * 300);
    }
    displayIndex *= -1;
};

redraw();
setInterval(redraw, 10000);