var timer = function () {
    var minutes, seconds, milliseconds,
        startTime, endTime, deltaTime,
        out;
    this.init = function () {
        minutes = 0, 
        seconds = 0,
        milliseconds = 0;
        out = "00:00:00";
    };
    this.startTimer = function () {
        startTime = Date.now();
    };
    this.stopTimer = function () {
        endTime = Date.now();
        deltaTime = endTime - startTime;
        console.log(deltaTime);
    };
    this.process = function () {
        var secondsDisplay = "",
            minutesDisplay = "";
        milliseconds = deltaTime%1000;
        seconds = (Math.trunc(deltaTime/1000))%60;
        if (seconds < 10) {
            secondsDisplay += "0" + seconds.toString();
        } else {
            secondsDisplay = seconds.toString();
        };
        minutes = (Math.trunc(deltaTime/(1000*60))%60);
        if (minutes < 10) {
            minutesDisplay += "0" + minutes.toString();
        } else {
            minutesDisplay = minutes.toString();
        };
        out = minutesDisplay + ":" + secondsDisplay + ":" + milliseconds.toString();
        this.output();
    };
    this.output = function () {
        return out;
    };
    this.showTime = function () {
        this.stopTimer();
        this.process();
        this.output();
    };
};
var spanTimer = document.getElementById("spanTimer"),
    startTimer = document.getElementById("startTimer"),
    stopTimer = document.getElementById("stopTimer");
var theClock = new timer;
var render = function () {
    theClock.showTime();
    spanTimer.innerHTML = theClock.output();
};

theClock.init();
spanTimer.innerHTML = theClock.output();
startTimer.addEventListener("click", theClock.startTimer);
stopTimer.addEventListener("click", render);

