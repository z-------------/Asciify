var Asciify = function(image, overrides) {
  if (
    image && (
    image instanceof Image || image instanceof HTMLCanvasElement ||
    image instanceof HTMLImageElement || image instanceof HTMLVideoElement
    )
  ) {
    this.options = Asciify.defaults;
    if (overrides) {
      let overridesKeys = Object.keys(overrides);
      for (let i = 0, l = overridesKeys.length; i < l; i++) {
        if (this.options.hasOwnProperty(overridesKeys[i])) {
          this.options[overridesKeys[i]] = overrides[overridesKeys[i]];
        }
      }
    }

    this.image = image;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.ratio = this.image.width / this.image.height;

    this.canvas.width = this.options.width;
    this.canvas.height = this.options.width / this.ratio * this.options.resolutionY;

    console.log(this)

    this.asciify = function() {
      this.context.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);

      let data = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;

      let asciiPixels = "";

      for (let i = 0, l = data.length; i < l; i += 4) { // do reds only, since it will be greyscaled
        asciiPixels += this.options.map[
          Math.round(
            (this.options.map.length - 1) * (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255
          )
        ];

        if (Math.ceil((i + 1) / 4) % this.canvas.width === 0) {
          asciiPixels += "\n";
        }
      }

      return asciiPixels;
    }
  } else {
    throw new Error("image must be Image, HTMLCanvasElement, HTMLImageElement, or HTMLVideoElement");
  }
};

Asciify.maps = {
  "TEN": "@#%*+=-:. ",
  "FIVE": "@=:. ",
  "FOUR_BLOCK": "█▓▒░",
  "TWO": "@ ",
  "TWO_BLOCK": "█ "
};

Asciify.defaults = {
  width: 100,
  map: Asciify.maps.TEN,
  resolutionY: 0.6
};
