var asciify = {};

asciify.maps = {
    "TEN": "@#%*+=-:. ",
    "FIVE": "@=:. ",
    "FOUR_BLOCK": "█▓▒░",
    "TWO": "@ ",
    "TWO_BLOCK": "█ "
};

asciify.defaults = {
    width: 100,
    map: asciify.maps.TEN,
    resolutionY: 0.6
};
    
asciify.asciify = function(image, config) {
    var options = asciify.defaults;
    if (config && typeof config === "object" && !Array.isArray(config)) {
        Object.keys(config).forEach(function(key){
            options[key] = config[key];
        });
    }

    if (image) {
        var map = options.map;
        var width = options.width;
        var resolutionY = options.resolutionY;
        
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        if (image instanceof HTMLCanvasElement ||
            image instanceof Image || image instanceof HTMLImageElement || image instanceof HTMLVideoElement) {
            var ratio = image.width / image.height;
            canvas.width = width;
            canvas.height = width / ratio * resolutionY;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        } else {
            return false;
        }

        var data = ctx.getImageData(0,0,canvas.width,canvas.height).data;

        for (i=0; i<data.length; i+=4)  { // greyscale the image
            var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            data[i] = brightness;
        }

        var asciiPixels = [];

        for (i=0; i<data.length; i+=4) { // do reds only, since it is greyscale

            var rchar = map[Math.round((map.length-1)*data[i]/255)];
            asciiPixels.push(rchar);
            
            if (Math.ceil((i+1)/4) % width == 0) {
                asciiPixels.push("\n");
            }
        }

        return asciiPixels.join("");
    } else {
        return false;
    }
};