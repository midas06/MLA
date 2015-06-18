/**********/
// Globals
/**********/
/*jslint browser: true, devel: true, sloppy: true */

var drag1 = document.getElementById("drag1");
var drag2 = document.getElementById("drag2");
var drag3 = document.getElementById("drag3");

var div1 = document.getElementById("div1");
var div2 = document.getElementById("div2");
var div3 = document.getElementById("div3");

var btnTest = document.getElementById("btnTest");

/*******************/
// Drag Drop handler
/*******************/

var dragStartHandler = function (event) {
    console.log("start");
    event.dataTransfer.setData("image", event.target.id);
};

var dragOverHandler = function (event) {
    event.preventDefault();
    event.stopPropagation();
};

var dragOverHandler2 = function (event) {
    event.stopPropagation();
};

var dropHandler = function (event) {
    console.log("drop");
    event.preventDefault();
    var data = event.dataTransfer.getData("image");
    event.target.appendChild(document.getElementById(data));
};

drag1.addEventListener("dragstart", dragStartHandler, false);
drag2.addEventListener("dragstart", dragStartHandler, false);
drag3.addEventListener("dragstart", dragStartHandler, false);

div1.addEventListener("dragover", dragOverHandler, false);
div2.addEventListener("dragover", dragOverHandler, false);
div3.addEventListener("dragover", dragOverHandler, false);

drag1.addEventListener("dragover", dragOverHandler2, false);
drag2.addEventListener("dragover", dragOverHandler2, false);
drag3.addEventListener("dragover", dragOverHandler2, false);

div1.addEventListener("drop", dropHandler, false);
div2.addEventListener("drop", dropHandler, false);
div3.addEventListener("drop", dropHandler, false);




/*************************************/
// Tester
/*************************************/
// Div 1,2,3 should house Drag 1,2,3

// Return true if image is in the right box

var divTest1 = function () {
    if (div1.childNodes[0] === drag1) {
    // if (div1.childNodes[0].getAttribute('src') === "img/spam.gif") {
        return true;
    }
};

var divTest2 = function () {
    if (div2.childNodes[0] === drag2) {
    //(div2.childNodes[0].getAttribute('src') === "img/egg.gif") {
        return true;
    }
};

var divTest3 = function () {
    if (div3.childNodes[0] === drag3) {
    //(div3.childNodes[0].getAttribute('src') === "img/cat.png") {
        return true;
    }
};

var orderTester = function () {
    if (divTest1() && divTest2() && divTest3()) {
        console.log("works");
    } else {
        console.log("wrong order");
    }
};

/**************************/
// Button functions
/**************************/

btnTest.addEventListener("click", orderTester);
