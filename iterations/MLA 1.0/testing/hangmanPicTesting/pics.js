var hangman1 = document.getElementById("iconA");
var hangman2 = document.getElementById("iconB");
var hangman3 = document.getElementById("iconC");
var btn = document.getElementById("btnShowGuessed");

hangman1.style.visibility = 'hidden';
hangman2.style.visibility = 'hidden';
hangman3.style.visibility = 'hidden';

var lives = 3;

var lifeCounter = function () {
    lives = lives - 1;
    picController();
};

btn.addEventListener("click", lifeCounter);

var picController = function () {
    if (lives === 3) {
        hangman1.style.visibility = 'hidden';
        hangman2.style.visibility = 'hidden';
        hangman3.style.visibility = 'hidden';
    } else if (lives === 2) {
        hangman1.style.visibility = 'visible';
        hangman2.style.visibility = 'hidden';
        hangman3.style.visibility = 'hidden';
    } else if (lives === 1) {
        hangman1.style.visibility = 'visible';
        hangman2.style.visibility = 'visible';
        hangman3.style.visibility = 'hidden';
    } else if (lives === 0) {
        hangman1.style.visibility = 'visible';
        hangman2.style.visibility = 'visible';
        hangman3.style.visibility = 'visible';
    }
};