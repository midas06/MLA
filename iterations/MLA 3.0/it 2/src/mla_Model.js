var MLA = MLA || {};

MLA.Model = function () {
    "use strict";
    var theFile,
        text,                   // string from the loaded file
        theUser;

    /**** File Handler ****/

    var loadedHandler = function (event) {
        console.log("the file has loaded");
        console.log(event);
        console.log(event.target.result);
        text = event.target.result;
        theUser.beginQuiz();
    };
    var fileChangeHandler = function (event) {
        var theReader = new FileReader();
        var validateFile = function () {
            var thepath = event.target.files[0].name.split(".");
            if (thepath[1] === "txt") {
                theFile = event.target.files[0];
            } else {
                alert("please select a text file");
            }
        };
        theReader.onload = loadedHandler;
        console.log("file has changed");
        validateFile();
        theReader.readAsText(theFile);
        docChange();
        document.getElementById("btnGetResource").style.display = "block";
    };
    document.getElementById("file").addEventListener("change", fileChangeHandler, false);

    /**** User class ****/
    var User = function () {
        var allMyQuestions = [],
            theQuestion;
        this.beginQuiz = function () {
            theQuestion = new Question();
            //allMyQuestions.push(theQuestion);
            theQuestion.init();
            theQuestion.startTimer();
        };
        this.setName = function () {
            var theName, input = document.getElementById("inputName");
            theName = input.value;
            if (theName === null || theName.length < 1) {
                alert("please enter a name!");
                return false;
            } else {
                theQuestion.setUsername(theName.toUpperCase());
                return true;
            }
        };
        this.getQuiz = function () {
            return theQuestion;
        };
        /*this.getAllMyQuestions = function () {
            return allMyQuestions;
        };
        this.getResults = function () {
            var i;
            for (i = 0; i < allMyQuestions.length; i += 1) {
                console.log(allMyQuestions[i].getTitle() + " " + allMyQuestions[i].getScore() + " " + allMyQuestions[i].getTimer().getTime());
            }
        };
        this.getSimilar = function (array) {
            var out = "", i, count = 0;
            for (i = 0; i < array.length; i += 1) {
                if (array[i].getTitle() === theQuestion.getTitle()) {
                    count = count + 1;
                    out += "<b>Attempt " + count + ": </b><br>&emsp;" + array[i].getScore() + " " + array[i].getTimer().getTime() + "<br>";
                }
            }
            return out;
        };
        this.sortScores = function () {
            var sortedArray = [], i;
            for (i = 0; i < allMyQuestions.length; i += 1) {
                sortedArray[i] = allMyQuestions[i];
            }
            sortedArray.sort(function (a, b) {
                if (a.getCount() < b.getCount()) {
                    return 1;
                }
                if (a.getCount() === b.getCount()) {
                    if (a.getTimer().getDeltaTime() > b.getTimer().getDeltaTime()) {
                        return 1;
                    }
                }
            });
            return sortedArray;
        };*/
        // every time a quiz is finished, create a LS Node
        var createLSNode = function () {
            var newNode;
            newNode = [theQuestion.getTitle(), theQuestion.getCount(), theQuestion.getTimer().getDeltaTime(), theQuestion.getUsername()];
            return newNode;
        };
        var createLocalStorage = function (title, array) {
            localStorage.setItem(title, JSON.stringify(array));
        };
        // add the node to the existing array
        this.updateLS = function () {
            var theArray, theNode, title;
            theNode = createLSNode();
            title = theNode[0];
            theArray = JSON.parse(localStorage.getItem(title)) || [];
                
            theArray.push(theNode);
            createLocalStorage(title, theArray);
        };
        var processTime = function (deltaTime) {
            var secondsDisplay = "",
                minutesDisplay = "",
                millisecondsDisplay = "",
                milliseconds,
                seconds,
                minutes,
                out;
            milliseconds = deltaTime % 1000;
            if (milliseconds < 100) {
                millisecondsDisplay += "0" + milliseconds.toString();
            } else {
                millisecondsDisplay = milliseconds.toString();
            }
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
            out = minutesDisplay + ":" + secondsDisplay + ":" + millisecondsDisplay;
            return out;
        };
        this.createLSHistory = function () {
            var theLS, i, out = "";
            theLS = JSON.parse(localStorage.getItem(theQuestion.getTitle()));
            for (i = 0; i < theLS.length; i += 1) {
                out += theLS[i][3] + ":     score: " + theLS[i][1] + " ,time: " + processTime(theLS[i][2]) + "<br>";
            }
            return out;
        };
        this.createLSRanked = function () {
            var theLS, i, j, out = "", sortedArray = [];
            theLS = JSON.parse(localStorage.getItem(theQuestion.getTitle()));
            for (i = 0; i < theLS.length; i += 1) {
                sortedArray[i] = theLS[i];
            }
            sortedArray.sort(function (a, b) {
                if (a[1] < b[1]) {
                    return 1;
                }
                if (a[1] === b[1]) {
                    if (a[2] > b[2]) {
                        return 1;
                    }
                }
            });
            for (j = 0; j < sortedArray.length; j += 1) {
                out += sortedArray[j][3] + ":     score: " + sortedArray[j][1] + " ,time: " + processTime(sortedArray[j][2]) + "<br>";
            }
            return out;
        };
    };

    /**** Question class ****/
    var Question = function () {
        var possibleAnswers = [],       // full list of words
            theResource,                // the correct answer
            tempArray,                  // array w/out the correct answer
            fillerArray,                // array of dummy answers
            questionArray,              // correct answer, dummy answers arranged randomly
            theQuestion,                // auto gen string for the question to be asked
            theHistoryOfTheWorld = [],  // history of answers for each question
            bandAid,                    // temp array to create fillerArray
            myTimer,                    // timer
            totalScore = "",            // string, number of questions answered correctly
            count,                      // counter for correct answers
            wordArray,                  // original array of words
            title,                      // title of the quiz
            username;                   // 

        this.setUsername = function (name) {
            username = name;
        };
        this.getUsername = function () {
            return username;
        };
        this.startTimer = function () {
            myTimer = new Timer();
        };
        this.getTimer = function () {
            return myTimer;
        };

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
            title = wordArray.pop();
            title = title[1];
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
            var aResource, i;
            count = 0;
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
            var out = "", i;
            count = 0;
            for (i = 0; i < theHistoryOfTheWorld.length; i += 1) {
                out += "<b>Question " + (i + 1) + ": </b>" + theHistoryOfTheWorld[i].isTrue() + "<br>";
                if (theHistoryOfTheWorld[i].isTrue() === "<font color='blue'>correct</font>") {
                    count = count + 1;
                }
            }
            totalScore += "<b>Total Score: </b>" + count;
            return out + "<br>" + "<font color='red'><b>Total Score: </b>" + count + "</font>";
        };
        this.getScore = function () {
            return totalScore;
        };
        this.getTitle = function () {
            return title;
        };
        this.getCount = function () {
            return count;
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
            var str = "<b>Elapsed time:</b> ";
            str += out;
            return str;
        };
        this.getDeltaTime = function () {
            return deltaTime;
        };
    };
    /**** Model functions ****/

    theUser = new User();
    var setSpan = function () {
        spanQuestion = theUser.getQuiz().getQuestion();
        spanTitle = theUser.getQuiz().getTitle();
    };

    var btnAnswers = function () {
        linkOne = theUser.getQuiz().retrieveEnglish(0);
        linkTwo = theUser.getQuiz().retrieveEnglish(1);
        linkThree = theUser.getQuiz().retrieveEnglish(2);
        linkFour = theUser.getQuiz().retrieveEnglish(3);
    };

    var publishQuestion = function () {
        btnAnswers();
        setSpan();
    };

    var getNextQuestion = function () {
        if (theUser.getQuiz().getWordArray().length > 0) {
            theUser.getQuiz().generateQuestion();
            publishQuestion();
        } else {
            theUser.getQuiz().getTimer().showTime();
            spanQuestion = theUser.getQuiz().printAnswersOnly();
            spanOptions = theUser.getQuiz().getTimer().getTime();
            linkOne = "";
            linkTwo = "";
            linkThree = "";
            linkFour = "";
            document.getElementById("btnReset").style.display = "block";
            document.getElementById("resultsPopup").style.display = "block";
            document.getElementById("btnChangeQuiz").style.display = "inline-block";
        }
    };

    /**** Answer Handler ****/
    var anAnswer;
    document.getElementById("linkOptionOne").onclick = function () {
        if (theUser.getQuiz().getQuestionArray()[0][1] === theUser.getQuiz().getTheResource()[1]) {
            console.log("true");
            anAnswer = true;
        } else {
            console.log("false");
            anAnswer = false;
        }
        theUser.getQuiz().createHistory(theUser.getQuiz().getQuestion(), theUser.getQuiz().getQuestionArray(), theUser.getQuiz().getQuestionArray()[0][1], anAnswer);
        getNextQuestion();
    };
    document.getElementById("linkOptionTwo").onclick = function () {
        if (theUser.getQuiz().getQuestionArray()[1][1] === theUser.getQuiz().getTheResource()[1]) {
            console.log("true");
            anAnswer = true;
        } else {
            console.log("false");
            anAnswer = false;
        }
        theUser.getQuiz().createHistory(theUser.getQuiz().getQuestion(), theUser.getQuiz().getQuestionArray(), theUser.getQuiz().getQuestionArray()[1][1], anAnswer);
        getNextQuestion();
    };
    document.getElementById("linkOptionThree").onclick = function () {
        if (theUser.getQuiz().getQuestionArray()[2][1] === theUser.getQuiz().getTheResource()[1]) {
            console.log("true");
            anAnswer = true;
        } else {
            console.log("false");
            anAnswer = false;
        }
        theUser.getQuiz().createHistory(theUser.getQuiz().getQuestion(), theUser.getQuiz().getQuestionArray(), theUser.getQuiz().getQuestionArray()[2][1], anAnswer);
        getNextQuestion();
    };
    document.getElementById("linkOptionFour").onclick = function () {
        if (theUser.getQuiz().getQuestionArray()[3][1] === theUser.getQuiz().getTheResource()[1]) {
            console.log("true");
            anAnswer = true;
        } else {
            console.log("false");
            anAnswer = false;
        }
        theUser.getQuiz().createHistory(theUser.getQuiz().getQuestion(), theUser.getQuiz().getQuestionArray(), theUser.getQuiz().getQuestionArray()[3][1], anAnswer);
        getNextQuestion();
    };

    /**** Buttons ****/
    this.butWaitTheresMore = function () {
        theUser.getQuiz().generateQuestion();
        publishQuestion();
        theUser.getQuiz().getTimer().createTimer();
        document.getElementById("btnGetResource").style.display = "none";
        document.getElementById("file").style.display = "none";
    };
    this.retryQuiz = function () {
        theUser.beginQuiz();
        this.butWaitTheresMore();
        spanOptions = "";
        document.getElementById("btnReset").style.display = "none";
        document.getElementById("divResults").style.display = "none";
    };
    this.changeQuiz = function () {
        document.getElementById("file").style.display = "block";
    };
    this.setName = function () {
        if (theUser.setName() === true) {
            theUser.setName();
            theUser.updateLS();
            document.getElementById("resultsPopup").style.display = "none";
            document.getElementById("divResults").style.display = "block";
        }
    };

    /**** View Functions ****/
    var spanQuestion = "",
        spanOptions = "",
        linkOne = "",
        linkTwo = "",
        linkThree = "",
        linkFour = "",
        spanTitle = "";

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
    this.getSpanTitle = function () {
        return spanTitle;
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
    this.clearAll = function () {
        spanQuestion = "";
        spanOptions = "";
        linkOne = "";
        linkTwo = "";
        linkThree = "";
        linkFour = "";
        theUser.beginQuiz();
        document.getElementById("btnGetResource").style.display = "block";
        document.getElementById("btnGetResource").innerHTML = "retry the quiz?";
        document.getElementById("resultsPopup").style.display = "none";
        document.getElementById("divResults").style.display = "none";
    };
    this.reload = function () {
        this.clearAll();
    };
    this.getResultsTime = function () {
        var resultsWindow = window.open("", "Results", "width=500, height=300, scrollbars=1, resizable=1");
        var title = "All Results for: <br>" + theUser.getQuiz().getTitle();
        var resultsList = theUser.createLSHistory();
        var html = "<html><head><style>@font-face{font-family: 'arcadeclassic';src: url('fonts/arcadeclassic.ttf');}</style></head><body style='font-family:arcadeclassic'><h1>" + title + "</h1>";
        html += "<p>" + resultsList + "</p></body></html>";

        resultsWindow.document.open();
        resultsWindow.document.write(html);
        resultsWindow.document.close();
    };
    this.getResultsOrdered = function () {
        var resultsWindow = window.open("", "Results", "width=500, height=300, scrollbars=1, resizable=1");
        var title = "Best Scores for    : <br>" + theUser.getQuiz().getTitle();
        var resultsList = theUser.createLSRanked();
        var html = "<html><head><style>@font-face{font-family: 'arcadeclassic';src: url('fonts/arcadeclassic.ttf');}</style></head><body style='font-family:arcadeclassic; letter-spacing:.08em'><h1>" + title + "</h1>";
        html += "<p>" + resultsList + "</p></body></html>";

        resultsWindow.document.open();
        resultsWindow.document.write(html);
        resultsWindow.document.close();
    };
    var docChange = function () {
        spanQuestion = "";
        spanOptions = "";
        document.getElementById("btnReset").style.display = "none";
        document.getElementById("spanQuestion").innerHTML = "";
        document.getElementById("spanOptions").innerHTML = "";
    };
};