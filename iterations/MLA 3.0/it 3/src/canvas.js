/*jslint
    browser, devel, this, for
*/

var higherCan, ctx1, scrollStep, scrollSteps = 0, delay = 20;
var lowerCan, ctx2, flashStep = 50, flashSteps = 255;
delay = 20;
var rgbstep = 50;

var init = function () {
    'use strict';
    initScroll();
    initFlash();
};


var initScroll = function () {
    'use strict';
    higherCan = document.getElementById("higherCanvas");
    ctx1 = higherCan.getContext("2d");
    ctx1.fillStyle = "Yellow";
    ctx1.font = "40pt arcadeclassic";
    ctx1.textAlign = "center";
    ctx1.textBaseline = "middle";
    scrollStep = 0;
    scrollSteps = higherCan.height / 2;
    scrollText();
};

var scrollText = function () {
    'use strict';
    scrollStep += 1;
    ctx1.clearRect(0, 0, higherCan.width, higherCan.height);
    ctx1.save();
    ctx1.translate(higherCan.width / 2, scrollStep);
    ctx1.fillText("Maori   Language   App", 40, 0);
    ctx1.restore();
    if (scrollStep < scrollSteps) {
        var t = setTimeout(scrollText, delay);
    }
};

var initFlash = function () {
    'use strict';
    lowerCan = document.getElementById("lowerCanvas");
    ctx2 = lowerCan.getContext("2d");
    ctx2.fillStyle = "Yellow";
    ctx2.font = "10pt arcadeclassic";
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    textFadeUp();
};

var textFadeUp = function () {
    'use strict';
    rgbstep += 1;
    ctx2.clearRect(0, 0, lowerCan.width, lowerCan.height);
    ctx2.fillStyle = "rgb(" + rgbstep + "," + rgbstep + "," + rgbstep + ")";
    ctx2.fillText("Insert coin", 340, 10);
    if (rgbstep < 255) {
        var t = setTimeout(textFadeUp, 10);
    }
    if (rgbstep === 255) {
        textFadeDown();
    }
};

var textFadeDown = function () {
    'use strict';
    rgbstep = rgbstep - 1;
    ctx2.clearRect(0, 0, lowerCan.width, lowerCan.height);
    ctx2.fillStyle = "rgb(" + rgbstep + "," + rgbstep + "," + rgbstep + ")";
    ctx2.fillText("Insert coin", 340, 10);
    if (rgbstep > 80) {
        var t = setTimeout(textFadeDown, 10);
    }
    if (rgbstep === 80) {
        textFadeUp();
    }
};

init();

// 53