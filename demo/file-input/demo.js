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
            outputElem.innerHTML = asciify.asciify(image)
                .replace(/\n/g, "<br>")
                .replace(/ /g, "&nbsp;");
        };
    };
    
    reader.readAsDataURL(file);
});