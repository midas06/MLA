var MLA = MLA || {};

MLA.Model = function () {
    'use strict';
    var theFile,
        text,                   // string from the loaded file
        wordArray,               // text > array
        newQuestion;

    /**** File Handler ****/

    var loadedHandler = function (event) {
        console.log("the file has loaded");
        console.log(event);
        console.log(event.target.result);
        text = event.target.result;
        newQuestion.init();
    };
    var fileChangeHandler = function (event) {
        var theReader = new FileReader();
        theReader.onload = loadedHandler;
        console.log("file has changed");
        theFile = event.target.files[0];
        theReader.readAsText(theFile);
        document.getElementById("file").style.display = "none";
        document.getElementById("btnGetResource").style.display = "block";
    };
    document.getElementById("file").addEventListener("change", fileChangeHandler, false);

    /**** Question class ****/
    var Question = function () {
        var possibleAnswers = [],   // full list of words
            theResource,            // the correct answer
            tempArray,              // array w/out the correct answer
            fillerArray,            // array of dummy answers
            questionArray,          // correct answer, dummy answers arranged randomly
            theQuestion,            // auto gen string for the question to be asked
            theHistoryOfTheWorld = [],
            bandAid;

        this.init = function () {
            textSplit();
            var i;
            for (i = 0; i < wordArray.length; i += 1) {
                possibleAnswers.push(wordArray[i]);
            }
        };
        var textSplit = function () {
            wordArray = text.split("\n");
            var i;
            for (i = 0; i < wordArray.length; i += 1) {
                wordArray[i] = wordArray[i].split(",");
            }
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
            var i;
            for (i = 0; i < possibleAnswers.length; i += 1) {
                tempArray.push(possibleAnswers[i]);
            }
            removeElementFromArray(theResource, tempArray);
        };
        var createFillerArray = function (fillerAmount) {
            createTempArray();
            fillerArray = [];
            bandAid = [theResource[1]];
            var aResource, count = 0, i;
            for (i = 0; count < fillerAmount; i += 1) {
                aResource = selectResource(tempArray);
                if (bandAid.indexOf(aResource[1]) > -1) {
                    // do nothing
                } else {
                    fillerArray.push(aResource);
                    bandAid.push(aResource[1]);
                    removeElementFromArray(aResource, tempArray);
                    count = count + 1;
                }
            }
            return fillerArray;
        };
        // Fisher-Yates Shuffle
        var shuffle = function (array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

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
            var out = "", i;
            for (i = 0; i < theHistoryOfTheWorld.length; i += 1) {
                out += "Question " + (i + 1) + ": <br><br>" + theHistoryOfTheWorld[i].getAll() + "<br><br>";
            }
            return out;
        };
        this.printAnswersOnly = function () {
            var out = "", count = 0, i;
            for (i = 0; i < theHistoryOfTheWorld.length; i += 1) {
                out += "<b>Question " + (i + 1) + ": </b>" + theHistoryOfTheWorld[i].isTrue() + "<br>";
                if (theHistoryOfTheWorld[i].isTrue() === "<font color='blue'>correct</font>") {
                    count = count + 1;
                }
            }
            return out + "<br>" + "<font color='red'><b>Total Score: </b>" + count + "</font>";
        };
    };

    /**** History class ****/
    var History = function (theQuestion, options, theAnswer, correct) {
        this.getQuestion = function () {
            var out = "The Question was: <br> &emsp;" + theQuestion;
            return out;
        };
        this.getOptions = function () {
            var out = "<br> The Options were: <br>",
                i;
            for (i = 0; i < options.length; i += 1) {
                out += "&emsp;" + options[i][1] + "<br>";
            }
            return out;
        };
        this.getTheAnswer = function () {
            var out = "<br> You answered: " + theAnswer;
            return out;
        };
        this.getCorrect = function () {
            var out = "<br> Your answer was: ";
            if (correct === true) {
                out += "Correct";
            } else {
                out += "Incorrect";
            }
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
        var minutes, seconds, milliseconds, startTime, endTime, deltaTime, out;
        var init = function () {
            minutes = 0;
            seconds = 0;
            milliseconds = 0;
            out = "00:00:00";
        };
        var startTimer = function () {
            startTime = Date.now();
        };
        var stopTimer = function () {
            endTime = Date.now();
            deltaTime = endTime - startTime;
        };
        var process = function () {
            var secondsDisplay = "",
                minutesDisplay = "";
            milliseconds = deltaTime % 1000;
            seconds = (Math.trunc(deltaTime / 1000)) % 60;
            if (seconds < 10) {
                secondsDisplay += "0" + seconds.toString();
            } else {
                secondsDisplay = seconds.toString();
            }
            minutes = (Math.trunc(deltaTime/(1000 * 60)) % 60);
            if (minutes < 10) {
                minutesDisplay += "0" + minutes.toString();
            } else {
                minutesDisplay = minutes.toString();
            }
            out = minutesDisplay + ":" + secondsDisplay + ":" + milliseconds.toString();
            //output();
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
            var str = "The quiz took you: ";
            str += out;
            return str;
        };
    };
    /**** Model functions ****/

    newQuestion = new Question();
    var theTimer = new Timer();

    var setSpan = function () {
        spanQuestion = newQuestion.getQuestion();
    };

    var btnAnswers = function () {
        linkOne = newQuestion.retrieveEnglish(0);
        linkTwo = newQuestion.retrieveEnglish(1);
        linkThree = newQuestion.retrieveEnglish(2);
        linkFour = newQuestion.retrieveEnglish(3);
    };

    var publishQuestion = function () {
        btnAnswers();
        setSpan();
    };

    var getNextQuestion = function () {
        if (wordArray.length > 0) {
            newQuestion.generateQuestion();
            publishQuestion();
        } else {
            theTimer.showTime();
            spanQuestion = newQuestion.printAnswersOnly();
            spanOptions = theTimer.getTime();
            linkOne = "";
            linkTwo = "";
            linkThree = "";
            linkFour = "";
            document.getElementById("btnReset").style.display = "block";
        }
    };

    /**** Answer Handler ****/
    var anAnswer;
    document.getElementById("linkOptionOne").onclick = function () {
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
    document.getElementById("linkOptionTwo").onclick = function () {
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
    document.getElementById("linkOptionThree").onclick = function () {
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
    document.getElementById("linkOptionFour").onclick = function () {
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

    this.butWaitTheresMore = function () {
        newQuestion.generateQuestion();
        publishQuestion();
        theTimer.createTimer();
        document.getElementById("btnGetResource").style.display = "none";
    };

    /**** View Functions ****/
    var spanQuestion = "",
        spanOptions = "",
        linkOne = "",
        linkTwo = "",
        linkThree = "",
        linkFour = "";

    var views = [];
    this.register = function (view) {
        views.push(view);
    };
    this.notify = function () {
        var i;
        for (i = 0; i < views.length; i += 1) {
            views[i].render(this);
        }
    };
    this.drawQuestions = function () {
        text = this.printQuestions();
    };
    this.getQuestions = function () {
        return text;
    };
    this.getSpanQuestion = function () {
        return spanQuestion;
    };
    this.getSpanOptions = function () {
        return spanOptions;
    };
    this.getLinkOne = function () {
        return linkOne;
    };
    this.getLinkTwo = function () {
        return linkTwo;
    };
    this.getLinkThree = function () {
        return linkThree;
    };
    this.getLinkFour = function () {
        return linkFour;
    };
    this.reload = function () {
        location.reload();
    };
};