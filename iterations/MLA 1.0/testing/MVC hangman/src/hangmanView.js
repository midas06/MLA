var hangmanapp = hangmanapp || {};

hangmanapp.View = function (controller) {
    var iconA = document.getElementById("iconA");
    var iconB = document.getElementById("iconB");
    var iconC = document.getElementById("iconC");
    var btnShowGuessed = document.getElementById("btnShowGuessed");
    var spnDashes = document.getElementById("spnDashes");
    var spnGuessedLetters = document.getElementById("spnGuessedLetters");
    this.render = function(model) {
        spnDashes.innerHTML = model.getDashes();
        spnGuessedLetters.innerHTML = model.getVal();
    };
        
    iconA.addEventListener("click", controller.newGuessA);
    iconB.addEventListener("click", controller.newGuessB);
    iconC.addEventListener("click", controller.newGuessC);
    //btnShowGuessed.addEventListener("click", controller.showGuessed);
    btnShowGuessed.addEventListener("click", controller.getGuessedLetters);
    //iconA.addEventListener("click", controller.newGuess("A"));
    /*iconB.addEventListener("click", controller.newGuess("B"));
    iconC.addEventListener("click", controller.newGuess("C"));*/
};