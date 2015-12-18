var Snowflake = (function () {
    function Snowflake($parent) {
        this.$parent = $parent;
        this.removed = false;
        this.x = randomInt(0, this.$parent.width());
        this.y = 0;
        this.size = randomInt(minSnowFlakeSize, maxSnowFlakeSize);
        this.speedX = normalDistributionInt(-2, 2) / minSnowFlakeSize * this.size;
        this.speedY = normalDistributionInt(1, 3) / minSnowFlakeSize * this.size;
        this.$element;
    }
    Snowflake.prototype.render = function ($parent) {
        this.$parent = $parent;
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
        this.x += this.speedX + wind / 10 / minSnowFlakeSize * this.size;
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
//# sourceMappingURL=Snowflake.js.map