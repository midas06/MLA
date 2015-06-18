var hangmanapp = hangmanapp || {};

hangmanapp.Controller = function () {
    var model, view = null;
    this.init = function () {
        model = new hangmanapp.Model();
        view = new hangmanapp.View(this);
        model.init();
        model.register(view);
        model.notify();
    };
    this.newGuessA = function () {
        model.newGuess("A");
    };
};