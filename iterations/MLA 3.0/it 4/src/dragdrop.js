/*global
    container, window
*/
/*jslint
    browser, devel, this, for
*/


var drag = document.getElementById("dollar");
var div = document.getElementById("coinslot");
var el = document.querySelector('.js-fade');
var coin = document.getElementById("coin");
var audio = document.getElementById("myAudio");

var dragStartHandler = function (event) {
    'use strict';
    console.log("start");
    event.dataTransfer.setData("image", event.target.id);
};

var dragOverHandler = function (event) {
    'use strict';
    event.preventDefault();
    event.stopPropagation();
};

var dragOverHandler2 = function (event) {
    'use strict';
    event.stopPropagation();
};

var dropHandler = function (event) {
    'use strict';
    console.log("drop");
    event.preventDefault();
    var data = event.dataTransfer.getData("image");
    event.target.appendChild(document.getElementById(data));
    if (div.childNodes[0] === drag) {
        drag.style.display = "none";
        fadeOut(container);
        setTimeout(changePage, 1100);
        coin.play();
        audio.pause();
    }
};

drag.addEventListener("dragstart", dragStartHandler, false);

div.addEventListener("dragover", dragOverHandler, false);

drag.addEventListener("dragover", dragOverHandler2, false);

div.addEventListener("drop", dropHandler, false);

function fadeOut(el) {
    'use strict';
    el.style.opacity = 1;
    var fade = function () {
        if ((el.style.opacity -= 0.1) < 0) {
            el.style.display = "none";
        } else {
            setTimeout(fade, 100);
        }
    };
    fade();
}

var changePage = function () {
    'use strict';
    window.location.href = "app.html";
};

//38