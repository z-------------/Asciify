var formInput = document.querySelector("#form_input");
var outputElem = document.querySelector("#output");

formInput.addEventListener("change", function(){
  var file = this.files[0];

  var reader = new FileReader();
  reader.onload = function() {
    var dataURI = reader.result;
    var image = document.createElement("img");
    image.src = dataURI;
    image.onload = function(){
      let asc = new Asciify(image, { html: true });
      outputElem.innerHTML = asc.asciify();
    };
  };

  reader.readAsDataURL(file);
});
