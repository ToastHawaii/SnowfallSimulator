var snowfall = new snow.Snowfall();
snowfall.start();
var snow;
(function (snow) {
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function normalDistributionInt(min, max) {
        return Math.floor((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6 * (max - min + 1)) + min;
    }
    var Snowflake = (function () {
        function Snowflake($parent) {
            this.$parent = $parent;
            this.minSnowFlakeSize = 15;
            this.maxSnowFlakeSize = 40;
            this.removed = false;
            this.x = randomInt(0, this.$parent.width());
            this.y = 0;
            this.size = randomInt(this.minSnowFlakeSize, this.maxSnowFlakeSize);
            this.speedX = normalDistributionInt(-2, 2) / this.minSnowFlakeSize * this.size;
            this.speedY = normalDistributionInt(1, 3) / this.minSnowFlakeSize * this.size;
            this.$element;
            this.render();
        }
        Snowflake.prototype.render = function () {
            this.$element = $("<div />")
                .addClass("glyphicon glyphicon-asterisk")
                .css({
                "position": "fixed",
                "transform": "translate(" + this.x + "px, " + this.y + "px)",
                "color": "rgba(255, 255, 255, 0.8)",
                "font-size": this.size + "px",
                "margin-left": "-" + this.size / 2 + "px",
                "margin-top": "-" + this.size / 2 + "px",
                "pointer-events": "none"
            })
                .appendTo(this.$parent);
        };
        Snowflake.prototype.fall = function (wind) {
            this.x += this.speedX + wind / 10 / this.minSnowFlakeSize * this.size;
            this.y += this.speedY;
            if (this.x < 0)
                this.x = this.$parent.width();
            if (this.x > this.$parent.width())
                this.x = 0;
            if (this.y > this.$parent.height() || this.y < 0) {
                this.$element.remove();
                this.removed = true;
            }
            else
                this.$element.css("transform", "translate(" + this.x + "px, " + this.y + "px)");
        };
        return Snowflake;
    })();
    snow.Snowflake = Snowflake;
    var Snowfall = (function () {
        function Snowfall() {
            this.snowflakes = [];
            this.windSpeed = 0;
            this.$body = $("body");
            this.maxWindSpeed = 4;
            this.maxNumberOfSnowFlakes = 50;
            this.fps = 25;
        }
        Snowfall.prototype.step = function () {
            if (this.windSpeed > this.maxWindSpeed * 10)
                this.windSpeed += normalDistributionInt(-2, 1);
            else if (this.windSpeed < this.maxWindSpeed * -10)
                this.windSpeed += normalDistributionInt(-1, 2);
            else
                this.windSpeed += normalDistributionInt(-2, 2);
            for (var _i = 0, _a = this.snowflakes; _i < _a.length; _i++) {
                var f = _a[_i];
                f.fall(this.windSpeed);
            }
            this.snowflakes = this.snowflakes.filter(function (f) { return !f.removed; });
            if ((this.maxNumberOfSnowFlakes === 0 || this.snowflakes.length < this.maxNumberOfSnowFlakes) && randomInt(0, 10) > 9)
                this.snowflakes.push(new Snowflake(this.$body));
        };
        Snowfall.prototype.start = function () {
            var _this = this;
            this.intervalId = setInterval(function () {
                _this.step();
            }, 1000 / this.fps);
        };
        Snowfall.prototype.stop = function () {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        };
        Object.defineProperty(Snowfall.prototype, "isRunning", {
            get: function () {
                return typeof this.intervalId !== "undefined";
            },
            enumerable: true,
            configurable: true
        });
        return Snowfall;
    })();
    snow.Snowfall = Snowfall;
})(snow || (snow = {}));
//# sourceMappingURL=bundle.js.map