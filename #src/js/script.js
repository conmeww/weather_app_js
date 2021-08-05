
var body = document.getElementById('body');
    var openMenu = document.getElementById('menuControlOpen'); // or whatever triggers the toggle
    var closeMenu = document.getElementById('menuControlClose'); // or whatever triggers the toggle

    openMenu.addEventListener('click', function(e) {
       body.classList.toggle('menu--active'); // or whatever your active class is
    });

     closeMenu.addEventListener('click', function(e) {
        body.classList.toggle('menu--active'); // or whatever your active class is
    });



