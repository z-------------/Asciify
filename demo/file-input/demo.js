let formInput = document.getElementById("form_input");
let widthInput = document.getElementById("width_input");
let mapInput = document.getElementById("map_input");

let outputElem = document.getElementById("output");

var image;

function refresh(image) {
  let asc = new Asciify(image, {
    html: true,
    resolutionY: 0.6,
    width: widthInput.value || Asciify.defaults.width,
    map: Asciify.maps[mapInput.value],
    transparencyAsWhite: true
  });
  outputElem.innerHTML = asc.asciify();
}

formInput.addEventListener("change", function() {
  let reader = new FileReader();
  reader.onload = function() {
    image = document.createElement("img");
    image.src = reader.result;
    image.onload = function() {
      refresh(this);
    };
  };

  reader.readAsDataURL(this.files[0]);
});

widthInput.addEventListener("input", (e) => {
  if (image) {
    refresh(image);
  }
});

mapInput.addEventListener("change", (e) => {
  if (image) {
    refresh(image);
  }
});
