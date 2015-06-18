function play() {
    'use strict';
    var myAudio = document.getElementById("myAudio");
    var aud = document.getElementById('nowPlaying');
    if (myAudio.paused) {
        myAudio.play();
        aud.hidden = false;
    }
}

function pause() {
    'use strict';
    var myAudio = document.getElementById("myAudio");
    var aud = document.getElementById('nowPlaying');
    myAudio.pause();
    aud.hidden = true;
}


function hide() {
    'use strict';
    var aud = document.getElementById('nowPlaying');
    aud.hidden = true;
}