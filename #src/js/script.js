var body = document.getElementById("body");
var openMenu = document.getElementById("menuControlOpen"); // or whatever triggers the toggle
var closeMenu = document.getElementById("menuControlClose"); // or whatever triggers the toggle

openMenu.addEventListener("click", function(e) {
  body.classList.toggle("menu--active"); // or whatever your active class is
});

closeMenu.addEventListener("click", function(e) {
  body.classList.toggle("menu--active"); // or whatever your active class is
});

///////////////
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function() {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function(support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
