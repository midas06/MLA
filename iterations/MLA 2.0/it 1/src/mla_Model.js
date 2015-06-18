var theFile,
    text,                   // string from the loaded file
    possibleAnswers = [],   // full list of words
    wordArray,              // text > array
    theResource,            // the correct answer
    tempArray,              // array w/out the correct answer
    fillerArray,            // array of dummy answers
    questionArray,          // correct answer, dummy answers arranged randomly
    theQuestion,            // auto gen string for the question to be asked
    anAnswer,               
    theHistoryOfTheWorld = [],
    correctCount,
    bandAid;

/**** File Handler ****/
var loadedHandler = function ( event ) {
    "use strict";
    console.log("the file has loaded");
    console.log( event );
    console.log( event.target.result );
    text = event.target.result;
    init();
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
    }; //17
};
document.getElementById("file").addEventListener("change", fileChangeHandler, false );
var init = function () {
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
/**** Question Class ****/
Question = function () {

var selectResource = function (array) {
    var aResource;
    aResource = array[Math.floor(Math.random() * array.length)];
    removeElementFromArray(aResource, array);
    return aResource;
}; //32
var getResource = function () {
    theResource = selectResource(wordArray);
    console.log(theResource);
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
    };
    return fillerArray;    //60
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
    this.shuffle(questionArray);
};
var createQuestion = function () {
    var out = "";
    out += "What is the English word for " + getMaori(theResource) + "?";
    return out;
}; //77
/**** Button functions ****/
var generateQuestion = function () {
    getResource();
    createFillerArray(3);
    createQuestionArray();
};

var publishQuestion = function () {
    //printQuestions();
    btnAnswers();
    render();
};
var getNextQuestion = function () {
    if (wordArray.length > 0) {
        generateQuestion();
        publishQuestion();
    } else {
        spanQuestion.innerHTML = "fin";
        linkOptionOne.innerHTML = "";
        linkOptionTwo.innerHTML = "";
        linkOptionThree.innerHTML = "";
        linkOptionFour.innerHTML = "";
    }
}; //94
var getOptions = function () {
    text = printQuestions();
    return text;
};
var getQuestion = function () {
    theQuestion = createQuestion();
    return theQuestion;
}; //100
var btnAnswers = function () {
    linkOptionOne.innerHTML = getEnglish(questionArray[0]);
    linkOptionTwo.innerHTML = getEnglish(questionArray[1]);
    linkOptionThree.innerHTML = getEnglish(questionArray[2]);
    linkOptionFour.innerHTML = getEnglish(questionArray[3]);
};
/**** Buttons, non MVC ****/

var spanQuestion = document.getElementById("spanQuestion"),
spanOptions = document.getElementById("spanOptions"),
btnGetResource = document.getElementById("btnGetResource"),
btnGenerate = document.getElementById("btnGenerate");
linkOptionOne = document.getElementById("linkOptionOne");
linkOptionTwo = document.getElementById("linkOptionTwo");
linkOptionThree = document.getElementById("linkOptionThree");
linkOptionFour = document.getElementById("linkOptionFour");


var render = function () {
    spanQuestion.innerHTML = getQuestion();
};
btnGetResource.addEventListener("click", generateQuestion);
btnGenerate.addEventListener("click", publishQuestion);

/**** Answer Handler ****/ 

linkOptionOne.onclick = function () {
    if (questionArray[0][1] === theResource[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    createHistory(getQuestion(), questionArray, questionArray[0][1], anAnswer);
};
linkOptionTwo.onclick = function () {
    if (questionArray[1][1] === theResource[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    createHistory(getQuestion(), questionArray, questionArray[1][1], anAnswer);
}; //135
linkOptionThree.onclick = function () {
    if (questionArray[2][1] === theResource[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    createHistory(getQuestion(), questionArray, questionArray[2][1], anAnswer);
};
linkOptionFour.onclick = function () {
    if (questionArray[3][1] === theResource[1]) {
        console.log("true");
        anAnswer = true;
    } else {
        console.log("false");
        anAnswer = false;
    }
    getNextQuestion();
    createHistory(getQuestion(), questionArray, questionArray[3][1], anAnswer);
};
var createHistory = function (theQuestion, options, theAnswer, correct) {
    theQuestion = new History(theQuestion, options, theAnswer, correct);
    theHistoryOfTheWorld.push(theQuestion);
}; //156

var printResults = function () {
    var out = "";
    for (var i = 0; i < theHistoryOfTheWorld.length; i++) {
        out += "Question " + (i + 1) + ": \n" + theHistoryOfTheWorld[i].getAll() + "\n\n";
    }
    return out;
}
var printAnswersOnly = function () {
    var out = "", 
        count = 0;
    for (var i = 0; i < theHistoryOfTheWorld.length; i++) {
        out += "Question " + (i + 1) + ": " + theHistoryOfTheWorld[i].isTrue() + "\n";
        if (theHistoryOfTheWorld[i].isTrue() === "correct") {
            count = count + 1;
        };
    }
    return out + "\n" + "total score: " + count;
};
};
/**** History class ****/
History = function (theQuestion, options, theAnswer, correct) {
    this.getQuestion = function () {
        var out = "The Question was: \n" + theQuestion;
        return out;
    };
    this.getOptions = function () {
        var out = "\n The Options were: \n";
        for (var i = 0; i < options.length; i++) {
            out += options[i][1] + "\n";
        }
        return out;
    };
    this.getTheAnswer = function () {
        var out = "\n You answered: " + theAnswer;
        return out;
    };
    this.getCorrect = function () {
        var out = "\n Your answer was "
        if (correct === true) {
            out += "Correct";
        } else {
            out += "Incorrect";
        };
        return out;
    }; //188
    this.getAll = function () {
        var out = this.getQuestion() + " \n" + this.getOptions() + " \n" + this.getTheAnswer() + "\n" + this.getCorrect();
        return out;
    };
    this.isTrue = function () {
        if (correct === true) {
            return "correct";
        } else {
            return "incorrect";
        }
    };
}; //196
/**** Timer class ****/
var Timer = function () {
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
    this.process = function () { //200
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
    };//220
};