(function () {
    var galleryUi = (function () {
        var xmlns = "http://www.w3.org/2000/svg";
        
        function supportsSvg() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        }
        
        function createSvg(path) {
            var svg = document.createElementNS(xmlns, "svg");
            svg.setAttributeNS(null,"width","128");
            svg.setAttributeNS(null,"height","256");
            svg.setAttributeNS(null, "class", "arrow");
            svg.appendChild(path);
            return svg;
        }
        
        function createPathWrapper(element) {
            var arrorContainer = document.createElement("div");
            arrorContainer.appendChild(element);
            return arrorContainer;            
        }
        
        function createTextArrow(char) {
            var arrow = document.createElement("span");
            arrow.setAttribute("class", "text-arrow");
            arrow.innerHTML = char;
            return arrow;
        }
        
        return {
            createLeftArrow: function () {      
                var arrow;     
                if(supportsSvg()) {                
                    var path = document.createElementNS(xmlns, "path");
                    path.setAttributeNS(null, "d", "M0,256L256,0v64L64,256l184,184v64z");
                    path.setAttributeNS(null, "transform", "scale(0.5)");
                    arrow = createSvg(path);               
                }
                else {
                    arrow = createTextArrow("<");
                }
                
                var container = createPathWrapper(arrow);
                container.setAttribute("class", "arrow left");
                return container;                
            },
            createRightArrow: function() {
                var arrow;
                if(supportsSvg()) {
                    var path = document.createElementNS(xmlns, "path");
                    path.setAttributeNS(null, "d", "M0,256L256,0v64L64,256l184,184v64z");
                    path.setAttributeNS(null, "transform", "scale(0.5) rotate(180 128 256)");
                    arrow = createSvg(path);    
                }
                else {
                    arrow = createTextArrow(">");
                }
                
                var container = createPathWrapper(arrow);
                container.setAttribute("class", "arrow right");
                return container;
            },
        };
    })();
    
    var gallery = document.getElementById("gallery");
    var picture = document.getElementById("picture");
    var currentPicture;

    var leftArrow = galleryUi.createLeftArrow();
    gallery.appendChild(leftArrow);
    leftArrow.onclick = function(e){
        showPrevPicture();
        e.stopPropagation();
    };
    
    var rightArrow = galleryUi.createRightArrow();
    gallery.appendChild(rightArrow);
    rightArrow.onclick = function(e){
        showNextPicture();
        e.stopPropagation();
    };

    var img = document.createElement('img');
    picture.appendChild(img);

    function isPhoto(element) {
        return element && element.className === 'photo';
    }
    
    function showPicture(element) {
        if (isPhoto(element)) {
            currentPicture = element;
            
            leftArrow.style.display = isPhoto(currentPicture.previousSibling) ? "inline" : "none";
            rightArrow.style.display = isPhoto(currentPicture.nextSibling) ? "inline" : "none";
            
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