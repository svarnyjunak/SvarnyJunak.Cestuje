(function () {
    var gallery = document.getElementById("gallery");
    var picture = document.getElementById("picture");
    var currentPicture;

    var img = document.createElement('img');
    picture.appendChild(img);

    function showPicture(element) {
        if (element && element.className === 'photo') {
            currentPicture = element;

            var photoUrl = element.getAttribute("data-img-url");
            img.setAttribute("src", '');
            img.setAttribute("src", photoUrl);
        }
    }

    function showPrevPicture() {
        if (currentPicture) {
            showPicture(currentPicture.previousSibling);
        }
    }

    function showNextPicture() {
        if (currentPicture) {
            showPicture(currentPicture.nextSibling);
        }
    }

    function hideGallery() {
        gallery.style.visibility = "hidden";
    }

    var photos = document.getElementsByClassName("photo");
    var onClick = function (e) {
        e.preventDefault();

        showPicture(this);
        gallery.style.visibility = "visible";
    };

    for (var i = 0, length = photos.length; i < length; i++) {
        photos[i].onclick = onClick;
    }

    picture.onclick = function (e) {
        e.stopPropagation();
        showNextPicture();
    };

    gallery.onclick = function () {
        hideGallery();
    };

    var KEY_CODES = {
        SPACE: 8,
        ESCAPE: 27,
        LEFT_ARROW: 37,
        RIGHT_ARROW: 39,
    };


    document.body.onkeydown = function (e) {
        if (e.keyCode === KEY_CODES.SPACE || e.keyCode === KEY_CODES.RIGHT_ARROW) {
            showNextPicture();
        }

        if (e.keyCode === KEY_CODES.LEFT_ARROW) {
            showPrevPicture();
        }

        if (e.keyCode === KEY_CODES.ESCAPE) {
            hideGallery();
        }
    };
})();