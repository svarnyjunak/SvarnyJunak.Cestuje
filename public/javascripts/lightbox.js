(function () {
    function isLighboxSupported() {
       return document.documentElement.clientWidth > 1000; 
    }
    
    if(!isLighboxSupported()) {
        return;//do not show lightbox when resolution is too small
    }
    
    var galleryUi = (function () {
        function createDiv(element, className) {
            var container = document.createElement("div");
            container.appendChild(element);
            container.setAttribute("class", className);
            return container;            
        }
        
        function supportsSvg() {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
        }
        
        var uiBuilderSvg = (function() {
            var xmlns = "http://www.w3.org/2000/svg";
        
            function createSvgArrow(path) {
                var svg = document.createElementNS(xmlns, "svg");
                svg.setAttributeNS(null,"width","128");
                svg.setAttributeNS(null,"height","256");
                svg.setAttributeNS(null, "class", "arrow");
                svg.appendChild(path);
                return svg;
            }
            
            return {
                createCloseButton: function() {
                    var path1 = document.createElementNS(xmlns, "path");
                    path1.setAttributeNS(null, "d", "M0,0L64,64");
                    
                    var path2 = document.createElementNS(xmlns, "path");
                    path2.setAttributeNS(null, "d", "M0,64L64,0");
                    
                    var svg = document.createElementNS(xmlns, "svg");
                    svg.setAttributeNS(null,"width","64");
                    svg.setAttributeNS(null,"height","64");
                    svg.appendChild(path1);
                    svg.appendChild(path2);
                    
                    return svg;
                },
                createLeftArrowButton: function() {
                    var path = document.createElementNS(xmlns, "path");
                    path.setAttributeNS(null, "d", "M0,256L256,0v64L64,256l184,184v64z");
                    path.setAttributeNS(null, "transform", "scale(0.5)");
                    return createSvgArrow(path);
                },
                createRightArrowButton: function() {
                    var path = document.createElementNS(xmlns, "path");
                    path.setAttributeNS(null, "d", "M0,256L256,0v64L64,256l184,184v64z");
                    path.setAttributeNS(null, "transform", "scale(0.5) rotate(180 128 256)");
                    return createSvgArrow(path);
                },                
            };            
        });

        var uiBuilderText = function() {
            function createSpan(char, className) {
                var arrow = document.createElement("span");
                arrow.setAttribute("class", className);
                arrow.innerHTML = char;
                return arrow;
            }
            
            return {
                createCloseButton: function() {
                    return createSpan("x", "text-close-button");    
                },
                createLeftArrowButton: function() {
                    return createSpan("<", "text-arrow");
                },
                createRightArrowButton: function() {
                    return createSpan(">", "text-arrow");
                },   
            };         
        };
        
        var uiBuilder = supportsSvg() ? uiBuilderSvg() : uiBuilderText();
        
        return {
            createCloseButton: function() {
                return createDiv(uiBuilder.createCloseButton(), "close-button"); 
            },            
            createLeftArrow: function () {      
                return createDiv(uiBuilder.createLeftArrowButton(), "arrow left");               
            },
            createRightArrow: function() {
                return createDiv(uiBuilder.createRightArrowButton(), "arrow right");
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
    
    var closeButton = galleryUi.createCloseButton();
    gallery.appendChild(closeButton);
    closeButton.onclick = hideGallery;

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
        if(isLighboxSupported()) {        
            e.preventDefault();

            showPicture(this);
            gallery.style.visibility = "visible";
        }
    };

    for (var i = 0, length = photos.length; i < length; i++) {
        photos[i].onclick = onClick;
    }

    picture.onclick = function (e) {
        e.stopPropagation();
        showNextPicture();
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