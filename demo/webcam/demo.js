navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

var outputElem = document.querySelector("output");

navigator.getUserMedia({ video: true }, function(stream) {
  var video = document.createElement("video");
  video.width = 500;
  video.height = 500 * 3 / 4;
  video.setAttribute("autoplay", "true");

  var objectURL = window.URL.createObjectURL(stream);
  video.src = objectURL;
  video.onloadedmetadata = function(e) {
    let asc = new Asciify(video, { html: true });
    let draw = function() {
      outputElem.innerHTML = asc.asciify(video);
      requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  };
}, function(err) {
  alert("please allow webcam access for this demo to work.");
});
