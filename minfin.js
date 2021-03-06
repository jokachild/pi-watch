var jsdom = require("jsdom");
var rp = require("request-promise");

var Pages = {
    usd: "http://minfin.com.ua/currency/auction/usd/buy/kiev/",
    eur: "http://minfin.com.ua/currency/auction/eur/buy/kiev/"
};

var onFulfilled = function (callback, body) {
    jsdom.env(body, ["http://code.jquery.com/jquery.js"], function (err, window) {
        var rate = window.$(".au-mid-buysell").eq(1).contents().eq(2).text().trim().split(" ")[0].replace(",", ".");
        callback(null, rate);
    });
};

var onRejected = function (callback, err) {
    callback(err, null);
};

module.exports = {
    GetRate: function (currency, callback) {
        rp({
            method: "GET",
            uri: Pages[currency],
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.103 Safari/537.36"
            }
        })
            .then(onFulfilled.bind(null, callback))
            .catch(onRejected.bind(null, callback));
    }
};