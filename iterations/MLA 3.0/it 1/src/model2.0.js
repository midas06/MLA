var MLA = MLA || {};



MLA.Model = function() {

var theFile,
    text,                   // string from the loaded file
    wordArray;             // text > array
    

/**** File Handler ****/

var loadedHandler = function ( event ) {
    "use strict";
    console.log("the file has loaded");
    console.log( event );
    console.log( event.target.result );
    text = event.target.result;
    newQuestion.init();
};
var fileChangeHandler = function (event) { 
    "use strict";
    var theReader = new FileReader();
    theReader.onload = loadedHandler;
    console.log("file has changed");
    theFile = event.target.files[0];
    theReader.readAsText( theFile );   
};
var textSplit = function () {
    "use strict";
    wordArray = text.split("\n");
    for (var i = 0; i < wordArray.length; i ++) {
    wordArray[i] = wordArray[i].split(",");
    };
};
document.getElementById("file").addEventListener("change", fileChangeHandler, false );


/**** Question class ****/
var Question = function () {
	var possibleAnswers = [],   // full list of words
        theResource,            // the correct answer
        tempArray,              // array w/out the correct answer
        fillerArray,            // array of dummy answers
        questionArray,          // correct answer, dummy answers arranged randomly
        theQuestion,            // auto gen string for the question to be asked
        anAnswer,               
        theHistoryOfTheWorld = [],
        correctCount,
        bandAid;
    
    this.getAll = function () {
        out = "";
        out += "wordArray" + wordArray;
        return out;
    };
    
    this.init = function () {
        textSplit();
        for (var i = 0; i < wordArray.length; i++) {
            possibleAnswers.push(wordArray[i]);
        }
    };      
    var textSplit = function () {
        wordArray = text.split("\n");
        for (var i = 0; i < wordArray.length; i ++) {
            wordArray[i] = wordArray[i].split(",");
        };
    };
    var selectResource = function (array) {
        var aResource;
        aResource = array[Math.floor(Math.random() * array.length)];
        removeElementFromArray(aResource, array);
        return aResource;
    };
    var getResource = function () {
        theResource = selectResource(wordArray);
        console.log(theResource);
        //this.render();
    };
    var getMaori = function (aResource) {
        return aResource[0];
    };
    var getEnglish = function (aResource) {
        return aResource[1];
    };
    var removeElementFromArray = function (element, array) {
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    };
    var createTempArray = function () {
        tempArray = [];
        for (var i = 0; i < possibleAnswers.length; i++) {
            tempArray.push(possibleAnswers[i]); 
        };
        // tempArray = wordArray;
        removeElementFromArray(theResource, tempArray);
    };
    var createFillerArray = function (fillerAmount) {
        createTempArray();
        fillerArray = [];
        bandAid = [theResource[1]];
        var aResource, count = 0;
        for (var i = 0; count < fillerAmount; i++) {
            aResource = selectResource(tempArray);
            if (bandAid.indexOf(aResource[1]) > -1) {
                "do nothing"
            } else {
                fillerArray.push(aResource);
                bandAid.push(aResource[1]);
                removeElementFromArray(aResource, tempArray);
                count = count + 1;
            };
        //fillerArray.push(aResource);
        //removeElementFromArray(aResource, tempArray);
        };
        return fillerArray;    
    };
    // Fisher-Yates Shuffle
    var shuffle = function (array) {
        var currentIndex = array.length, 
        temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }
        return array;
    };
    var createQuestionArray = function () {
        questionArray = fillerArray;
        questionArray.push(theResource);
        shuffle(questionArray);
    };
    var createQuestion = function () {
        var out = "";
        out += "What is the English word for " + getMaori(theResource) + "?";
        return out;
    };
    this.createHistory = function (theQuestion, options, theAnswer, correct) {
        theQuestion = new History(theQuestion, options, theAnswer, correct);
        theHistoryOfTheWorld.push(theQuestion);
    };

    this.generateQuestion = function () {
        getResource();
        createFillerArray(3);
        createQuestionArray();
    };
    this.getQuestion = function () {
        theQuestion = createQuestion();
        return theQuestion;
    };
    this.retrieveEnglish = function (questionNumber) {
        return getEnglish(questionArray[questionNumber]);
    };
    this.getWordArray = function () {
        return wordArray;
    };
    this.getQuestionArray = function () {
        return questionArray;
    };
    this.getTheResource = function () {
        return theResource;
    };
    this.printResults = function () {
        var out = "";
        for (var i = 0; i < theHistoryOfTheWorld.length; i++) {
            //out += "Question " + (i + 1) + ": \n" + theHistoryOfTheWorld[i].getAll() + "\n\n";
            out += "Question " + (i + 1) + ": <br><br>" + theHistoryOfTheWorld[i].getAll() + "<br><br>";
        }
        return out;
    };
    this.printAnswersOnly = function () {
        var out = "", 
            count = 0;
        for (var i = 0; i < theHistoryOfTheWorld.length; i++) {
            out += "<b>Question " + (i + 1) + ": </b>" + theHistoryOfTheWorld[i].isTrue() + "<br>";
            if (theHistoryOfTheWorld[i].isTrue() === "<font color='blue'>correct</font>") {
                count = count + 1;
            };
        }
        return out + "<br>" + "<font color='red'><b>Total Score: </b>" + count + "</font>";
    };
};
    
/**** History class ****/
History = function (theQuestion, options, theAnswer, correct) {
    this.getQuestion = function () {
        var out = "The Question was: <br> &emsp;" + theQuestion;
        return out;
    };
    this.getOptions = function () {
        var out = "<br> The Options were: <br>";
        for (var i = 0; i < options.length; i++) {
            out += "&emsp;" + options[i][1] + "<br>";
        }
        return out;
    };
    this.getTheAnswer = function () {
        var out = "<br> You answered: " + theAnswer;
        return out;
    };
    this.getCorrect = function () {
        var out = "<br> Your answer was: "
        if (correct === true) {
            out += "Correct";
        } else {
            out += "Incorrect";
        };
        return out;
    };
    this.getAll = function () {
        var out = this.getQuestion() + " <br>" + this.getOptions() + " <br>" + this.getTheAnswer() + "<br>" + this.getCorrect();
        return out;
    };
    this.isTrue = function () {
        if (correct === true) {
            return "<font color='blue'>correct</font>";
        } else {
            return "<font color='green'>incorrect</font>";
        }
    };
};
/**** Timer class ****/
var Timer = function () {
    var minutes, seconds, milliseconds,
        startTime, endTime, deltaTime,
        out;
    var init = function () {
        minutes = 0, 
        seconds = 0,
        milliseconds = 0;
        out = "00:00:00";
    };
    var startTimer = function () {
        startTime = Date.now();
    };
    var stopTimer = function () {
        endTime = Date.now();
        deltaTime = endTime - startTime;
        //console.log(deltaTime);
    };
    var process = function () {
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
        //output();
    };
    var output = function () {
        return out;
    };
    this.showTime = function () {
        stopTimer();
        process();
        //this.output();
    };
    this.createTimer = function () {
        init();
        startTimer();
    };
    this.getTime = function () {
        str = "The quiz took you: ";
        str += out;
        return str;
    };
};    
/**** View ****/    

/**** Buttons, non MVC ****/

var spanQuestion = document.getElementById("spanQuestion"),
    spanOptions = document.getElementById("spanOptions"),
    btnGetResource = document.getElementById("btnGetResource"),
    btnGenerate = document.getElementById("btnGenerate");
    linkOptionOne = document.getElementById("linkOptionOne");
    linkOptionTwo = document.getElementById("linkOptionTwo");
    linkOptionThree = document.getElementById("linkOptionThree");
    linkOptionFour = document.getElementById("linkOptionFour");   
    
var newQuestion = new Question,
    theTimer = new Timer;
    
    
var render = function () {
    spanQuestion.innerHTML = newQuestion.getQuestion();
};

var btnAnswers = function () {
    linkOptionOne.innerHTML = newQuestion.retrieveEnglish(0);
    linkOptionTwo.innerHTML = newQuestion.retrieveEnglish(1);
    linkOptionThree.innerHTML = newQuestion.retrieveEnglish(2);
    linkOptionFour.innerHTML = newQuestion.retrieveEnglish(3);
};    
    
var publishQuestion = function () {
    //printQuestions();
    btnAnswers();
    render();
};

var getNextQuestion = function () {
    if (wordArray.length > 0) {
        newQuestion.generateQuestion();
        publishQuestion();
    } else {
        theTimer.showTime();
        //spanQuestion.innerHTML = newQuestion.printResults();
        spanQuestion.innerHTML = newQuestion.printAnswersOnly();
        spanOptions.innerHTML = theTimer.getTime();
        linkOptionOne.innerHTML = "";
        linkOptionTwo.innerHTML = "";
        linkOptionThree.innerHTML = "";
        linkOptionFour.innerHTML = "";
    };
};

/**** Answer Handler ****/ 

linkOptionOne.onclick = function () {
    if (newQuestion.getQuestionArray()[0][1] === newQuestion.getTheResource()[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    newQuestion.createHistory(newQuestion.getQuestion(), newQuestion.getQuestionArray(), newQuestion.getQuestionArray()[0][1], anAnswer);
};
linkOptionTwo.onclick = function () {
    if (newQuestion.getQuestionArray()[1][1] === newQuestion.getTheResource()[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    newQuestion.createHistory(newQuestion.getQuestion(), newQuestion.getQuestionArray(), newQuestion.getQuestionArray()[1][1], anAnswer);
};
linkOptionThree.onclick = function () {
    if (newQuestion.getQuestionArray()[2][1] === newQuestion.getTheResource()[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    newQuestion.createHistory(newQuestion.getQuestion(), newQuestion.getQuestionArray(), newQuestion.getQuestionArray()[2][1], anAnswer);
};
linkOptionFour.onclick = function () {
    if (newQuestion.getQuestionArray()[3][1] === newQuestion.getTheResource()[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    newQuestion.createHistory(newQuestion.getQuestion(), newQuestion.getQuestionArray(), newQuestion.getQuestionArray()[3][1], anAnswer);
};

/**** Buttons ****/

var butWaitTheresMore = function () {
    newQuestion.generateQuestion();
    publishQuestion();
    theTimer.createTimer();
};
btnGetResource.addEventListener("click", butWaitTheresMore);
//btnGetResource.addEventListener("click", newQuestion.generateQuestion);
//btnGenerate.addEventListener("click", publishQuestion);

};