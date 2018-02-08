var Asciify = function(image, overrides) {
  if (
    image && (
    image instanceof Image || image instanceof HTMLCanvasElement ||
    image instanceof HTMLImageElement || image instanceof HTMLVideoElement
    )
  ) {
    let options = Asciify.defaults;
    if (overrides) {
      let overridesKeys = Object.keys(overrides);
      for (let i = 0, l = overridesKeys.length; i < l; i++) {
        if (options.hasOwnProperty(overridesKeys[i])) {
          options[overridesKeys[i]] = overrides[overridesKeys[i]];
        }
      }
    }

    image = image;
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    ratio = image.width / image.height;

    canvas.width = options.width;
    canvas.height = options.width / ratio * options.resolutionY;

    this.asciify = function() {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      let data = context.getImageData(0, 0, canvas.width, canvas.height).data;

      let asciiPixels = "";

      for (let i = 0, l = data.length; i < l; i += 4) { // do reds only, since it will be greyscaled
        asciiPixels += options.map[
          Math.round(
            (options.map.length - 1) * (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255
          )
        ];

        if (Math.ceil((i + 1) / 4) % canvas.width === 0) {
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
