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
    lives,              // remaining lives
    space;

var dictionary = ['apple', 'pear', 'couch'] //, 'K&#333;rua'];

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

/********************/
// app
/********************/

this.init = function () {
    lives = 10;
};
var newWord = function () {
    word = dictionary[Math.floor(Math.random() * dictionary.length)];
    dashedWord = new Array(word.length + 1).join("-");
    wordArray = word.split("");
    // for testing
    console.log(word);
    console.log(dashedWord);
};
// checks to see if letter has already been guessed, shouldn't matter if using click to guess
var guessChecker = function (letter) {
    for (var i = 0; i < guessedArray.length; i++) {
        if (letter === guessedArray[i]) {
            return false;
        }
    }
    return true;
};
var newGuess = function (letter) {
    var theLetter = letter.toLowerCase();
    if (guessChecker(theLetter)) {
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
var showGuessed = function () {
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

/****************/
// View
/****************/

var iconA = document.getElementById("iconA");
var iconB = document.getElementById("iconB");
var iconC = document.getElementById("iconC");

iconA.addEventListener("click", newGuess("A"));
iconB.addEventListener("click", newGuess("B"));
iconC.addEventListener("click", newGuess("C"));