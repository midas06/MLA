/* loader */

var array = [], text, theResource;

var loadedHandler = function ( event ) {
    "use strict";
    console.log("the file has loaded");
    console.log( event );
    console.log( event.target.result );
    text = event.target.result;
    textSplit();
}

var fileChangeHandler = function (event) { 
   "use strict";
   var theFile;
   var theReader = new FileReader();
   theReader.onload = loadedHandler;
   console.log("file has changed");
   theFile = event.target.files[0];
   theReader.readAsText( theFile );   
};

document.getElementById("file").addEventListener("change", fileChangeHandler, false );

/* array handler */

var textSplit = function () {
    array = text.split("\n");
};

var getResource = function () {
    var fullResource = array[Math.floor(Math.random() * array.length)];
    theResource = fullResource.split(",");
    console.log(theResource);
};

var getMaori = function () {
    return aResource[0];
};

var getEnglish = function (aResource) {
    return aResource[1];
};