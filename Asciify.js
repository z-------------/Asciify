var Asciify = function(imageInput, overrides) {
  if (
    imageInput && (
    imageInput instanceof Image || imageInput instanceof HTMLCanvasElement ||
    imageInput instanceof HTMLImageElement || imageInput instanceof HTMLVideoElement
    )
  ) {
    let options = Object.assign({}, Asciify.defaults);
    if (overrides) {
      let overridesKeys = Object.keys(overrides);
      for (let i = 0, l = overridesKeys.length; i < l; i++) {
        if (options.hasOwnProperty(overridesKeys[i])) {
          options[overridesKeys[i]] = overrides[overridesKeys[i]];
        }
      }
    }

    const NEWLINE = options.html ? "<br>" : "\n";

    options.map = options.map.split("");
    if (options.html) {
      for (let i = 0, l = options.map.length; i < l; i++) {
        if (options.map[i] === " ") {
          options.map[i] = "&nbsp;";
        }
      }
    }

    const drawImage = options.transparencyAsWhite
      ? function() {
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      : function() {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };

    const image = imageInput;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const ratio = image.width / image.height;

    canvas.width = options.width;
    canvas.height = options.width / ratio * options.resolutionY;

    context.fillStyle = "white"; // for fillRect() if options.transparencyAsWhite

    this.asciify = function() {
      drawImage();

      let data = context.getImageData(0, 0, canvas.width, canvas.height).data;

      let asciiPixels = "";

      for (let i = 0, l = data.length; i < l; i += 4) { // do reds only, since it will be greyscaled
        asciiPixels += options.map[
          Math.round(
            (options.map.length - 1) * (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255
          )
        ];

        if (Math.ceil((i + 1) / 4) % canvas.width === 0) {
          asciiPixels += NEWLINE;
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
  "FIVE_BLOCK": "█▓▒░ ",
  "FOUR_BLOCK": "█▓▒░",
  "TWO": "@ ",
  "TWO_BLOCK": "█ "
};

Asciify.defaults = {
  width: 100,
  map: Asciify.maps.TEN,
  resolutionY: 0.6,
  html: false,
  transparencyAsWhite: false
};
