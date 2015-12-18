namespace snow {
    function randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function normalDistributionInt(min: number, max: number) {
        return Math.floor((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) / 6 * (max - min + 1)) + min;
    }

    export class Snowflake {
        public minSnowFlakeSize = 25;
        public maxSnowFlakeSize = 45;

        public x: number;
        public y: number;
        public size: number;
        public speedX: number;
        public speedY: number;
        public $element: JQuery;
        public removed = false;

        public constructor(public $parent: JQuery) {
            this.x = randomInt(0, this.$parent.width());
            this.y = 0;
            this.size = randomInt(this.minSnowFlakeSize, this.maxSnowFlakeSize);
            this.speedX = normalDistributionInt(-2, 2) / this.minSnowFlakeSize * this.size;
            this.speedY = normalDistributionInt(1, 3) / this.minSnowFlakeSize * this.size;
            this.$element;

            this.render();
        }

        private render() {
            this.$element = $("<div />")
                .addClass("glyphicon glyphicon-asterisk")
                .css({
                    "position": "fixed",
                    "transform": "translate(" + this.x + "px, " + this.y + "px)",
                    "color": "rgba(255, 255, 255, 0.7)",
                    "font-size": this.size + "px",
                    "margin-left": "-" + this.size / 2 + "px",
                    "margin-top": "-" + this.size / 2 + "px",
                    "pointer-events": "none"
                });
            this.$element.appendTo(this.$parent);
        }

        public fall(wind: number) {
            this.x += (this.speedX + wind / 10) / this.minSnowFlakeSize * this.size;
            this.y += this.speedY;

            if (this.x < 0)
                this.x = this.$parent.width();

            if (this.x > this.$parent.width())
                this.x = 0;

            if (this.y > this.$parent.height() || this.y < 0) {
                this.$element.remove();
                this.removed = true;
            } else
                this.$element.css("transform", "translate(" + this.x + "px, " + this.y + "px)");
        }
    }

    export class Snowfall {
        public snowflakes: Snowflake[] = [];
        public windSpeed = 0;
        public $parent = $("body");

        public maxWindSpeed = 4;

        public maxNumberOfSnowFlakes = 0;

        public fps = 25;

        private intervalId: number;

        public step() {
            if (this.windSpeed > this.maxWindSpeed * 10)
                this.windSpeed += normalDistributionInt(-2, 1);
            else if (this.windSpeed < this.maxWindSpeed * -10)
                this.windSpeed += normalDistributionInt(-1, 2);
            else
                this.windSpeed += normalDistributionInt(-2, 2);

            for (let f of this.snowflakes)
                f.fall(this.windSpeed);

            this.snowflakes = this.snowflakes.filter(f => !f.removed);

            if ((this.maxNumberOfSnowFlakes === 0 || this.snowflakes.length < this.maxNumberOfSnowFlakes) && randomInt(0, 10) > 8)
                this.snowflakes.push(new Snowflake(this.$parent));
        }

        public start() {
            this.intervalId = setInterval(() => {
                this.step();
            }, 1000 / this.fps);
        }

        public stop() {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }

        public get isRunning() {
            return typeof this.intervalId !== "undefined";
        }
    }
}