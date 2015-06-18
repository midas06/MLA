var hangmanapp = hangmanapp || {};

hangmanapp.Model = function () {

    /********************/
    // globals
    /********************/
    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z', '&#257;', '&#275;',
            '&#299;', '&#333;', '&#363;'];

    var word,               // the word to guess
        dashedWord,         // blanked out word to guess
        wordArray,          // word.split 
        guess,              // the letter that is guessed
        guessedArray = [],  // guessed letters
        incorrectArray = [],// incorrect guesses
        lives;              // remaining lives
        

    var dictionary = ['apple', 'pear', 'couch', 'K&#333;rua'];

    String.prototype.replaceAt = function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    };

    /********************/
    // app
    /********************/
    Game = function () {
        this.setLives = function () {
            lives = 10;
        };
        this.newWord = function () {
            word = dictionary[Math.floor(Math.random() * dictionary.length)];
            dashedWord = new Array(word.length + 1).join("-");
            wordArray = word.split("");
            // for testing
            console.log(word);
            console.log(dashedWord);
        };
        // checks to see if letter has already been guessed, shouldn't matter if using click to guess
        this.guessChecker = function (letter) {
            for (var i = 0; i < guessedArray.length; i++) {
                if (letter === guessedArray[i]) {
                    return false;
                }
            }
            return true;
        };
        this.newGuess = function (letter) {
            var theLetter = letter.toLowerCase();
            if (this.guessChecker(theLetter)) {
                if (word.indexOf(theLetter) > -1) {
                    console.log("letter found");
                    for (var i = 0; i < wordArray.length; i++) {
                        if (wordArray[i] === theLetter) {
                            dashedWord = dashedWord.replaceAt(i, theLetter);
                        }
                    }
                    guessedArray.push(theLetter);
                } else {
                    console.log("nope");
                    guessedArray.push(theLetter);
                    incorrectArray.push(theLetter);
                    lives = (lives - 1);
                }
            } else {
                console.log("letter has already been guessed");
            }
            // for testing
            console.log(word);
            console.log(dashedWord);
        };
        this.showGuessed = function () {
            console.log("Guessed Letters:");
            for (var i = 0; i < guessedArray.length; i++) {
                console.log(guessedArray[i]);
            }
            console.log("Incorrect Guesses:");
            for (var j = 0; j < incorrectArray.length; j++) {
                console.log(incorrectArray[j]);
            }
            console.log("lives remaining: " + lives);
        };
        this.returnGuessed = function () {
            var out = "";
            out += "Guessed Letters" + "<br>";
            for (var i = 0; i < guessedArray.length; i++) {
                out += guessedArray[i] + "<br>";
            };
            out += "Incorrect Guesses" + "<br>";
             for (var j = 0; j < incorrectArray.length; j++) {
                out += incorrectArray[j] + "<br>";
             };
             out += "Lives Remaining: " + lives;
        return out;     
        };
        
        /********************/
        // hangman canvas functions
        /********************/
        
        /*this.setImageVisible = function (id, visible) {
            image = 
        }*/
        
    };
        
    /***************/
    // MVC
    /***************/
    var views = [], 
        newGame, val;
    this.register = function(view) {
        views.push(view);
    };
    this.notify = function () {
        for (var i = 0; i < views.length; i++) {
            views[i].render(this);
        }
    };
    this.init = function () {
        newGame = new Game;
        newGame.setLives();
        newGame.newWord();
    };
    this.newGuess = function (theGuess) {
        newGame.newGuess(theGuess);
    };
    this.showGuessed = function () {
        return newGame.showGuessed();
    };
    this.getDashes = function () {
        return dashedWord;
    };
    this.getGuessedLetters = function () {
        val = newGame.returnGuessed();
    };
    this.getVal = function () {
        return val;
    };
};  