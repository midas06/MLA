/*var MLA = MLA || {};



MLA.Model = function() {*/
    
    var theFile,
        text,               // string from the loaded file
        wordArray,          // text > array
        theResource,        // the correct answer
        tempArray,          // array w/out the correct answer
        fillerArray = [],   // array of dummy answers
        questionArray;      // correct answer, dummy answers arranged randomly

    /**** File Handler ****/
    loadedHandler = function ( event ) {
        "use strict";
        console.log("the file has loaded");
        console.log( event );
        console.log( event.target.result );
        text = event.target.result;
        textSplit();
    };
    fileChangeHandler = function (event) { 
        "use strict";
        var theReader = new FileReader();
        theReader.onload = loadedHandler;
        console.log("file has changed");
        theFile = event.target.files[0];
        theReader.readAsText( theFile );   
    };
    document.getElementById("file").addEventListener("change", fileChangeHandler, false );


    /**** Question Class ****/
    textSplit = function () {
        wordArray = text.split("\n");
    };

    this.selectResource = function (array) {
        var fullResourse, splitResource;
        fullResource = array[Math.floor(Math.random() * array.length)];
        splitResource = fullResource.split(",");
        return splitResource;
    };

    this.getResource = function () {
        theResource = this.selectResource(wordArray);
        console.log(theResource);
    };

    this.getMaori = function () {
        return theResource[0];
    };

    this.getEnglish = function () {
        return theResource[1];
    };



    this.removeElementFromArray = function (element, array) {
        var index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    };

    this.createTempArray = function () {
        tempArray = wordArray;
        this.removeElementFromArray(theResource.toString(), tempArray);
    };

    this.createFillerArray = function (fillerAmount) {
        this.createTempArray();
        var aResource, index;
        for (var i = 0; i < fillerAmount; i++) {
            aResource = this.selectResource(tempArray);
            fillerArray.push(aResource.toString());
            this.removeElementFromArray(aResource.toString(), tempArray); 
        }
        return fillerArray;    
    };

    // Fisher-Yates Shuffle
    this.shuffle = function (array) {
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
    }

    this.createQuestionArray = function () {
        questionArray = fillerArray;
        questionArray.push(theResource.toString());
        this.shuffle(questionArray);
    };
    this.printQuestions = function () {
        var out = "";
        for (var i = 0; i < questionArray.length; i++) {
            out += questionArray[i] + "<br>";
        }
        return out;
    };

    /**** Controller functions ****/
    var views = [],
        text = "aa";
    this.register = function (view) {
        views.push(view);
    };
    this.notify = function () {
        for (var i = 0; i < views.length; i++) {
            views[i].render(this);
        };
    };

    this.drawQuestions = function () {
        text = this.printQuestions();
    };

    this.getQuestions = function () {
        return text;
    };
    
//};
