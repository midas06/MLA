var hangmanapp = hangmanapp || {};

hangmanapp.Controller = function () {
    var model, view = null;
    this.init = function () {
        model = new hangmanapp.Model();
        view = new hangmanapp.View(this);
        model.init();
        console.log(model.lives);
        model.register(view);
        model.notify();
    };
    /*this.newGuess = function (theLetter) {
        model.newGuess(theLetter);
    };*/
    this.newGuessA = function () {
        model.newGuess("A");
        model.notify();
    };
    this.newGuessB = function () {
        model.newGuess("B");
        model.notify();
    };
    this.newGuessC = function () {
        model.newGuess("C");
        model.notify();
    };
    this.showGuessed = function () {
        model.showGuessed();
        model.notify();
    };
    this.getGuessedLetters = function () {
        model.getGuessedLetters();
        model.notify();
    };
};