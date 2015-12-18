var snowflakes = [];
var windSpeed = 0;
var $body = $("body");
var fps = 25;
var maxWindSpeed = 4;
var minSnowFlakeSize = 15;
var maxSnowFlakeSize = 40;
var maxNumberOfSnowFlakes = 50;
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function normalDistributionInt(min, max) {
    return Math.floor((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6 * (max - min + 1)) + min;
}
var Snowfall = (function () {
    function Snowfall() {
    }
    return Snowfall;
})();
setInterval(function () {
    if (windSpeed > maxWindSpeed * 10)
        windSpeed += normalDistributionInt(-2, 1);
    else if (windSpeed < maxWindSpeed * -10)
        windSpeed += normalDistributionInt(-1, 2);
    else
        windSpeed += normalDistributionInt(-2, 2);
    for (var _i = 0; _i < snowflakes.length; _i++) {
        var f = snowflakes[_i];
        f.fall(windSpeed);
    }
    snowflakes = snowflakes.filter(function (f) { return !f.removed; });
    if ((maxNumberOfSnowFlakes == 0 || snowflakes.length < maxNumberOfSnowFlakes) && randomInt(0, 10) > 9)
        snowflakes.push(new Snowflake($body));
}, 1000 / fps);
//# sourceMappingURL=Snowfall.js.map