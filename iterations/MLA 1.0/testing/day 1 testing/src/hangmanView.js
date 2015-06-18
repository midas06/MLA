var hangmanapp = hangmanapp || {};

hangmanapp.View = function (controller) {
    var iconA = document.getElementById("iconA");
    var iconB = document.getElementById("iconB");
    var iconC = document.getElementById("iconC");
    
    this.render = function(model) {
        //
    };
    iconA.addEventListener("click", controller.newGuessA);
    /*iconB.addEventListener("click", controller.newGuess("B"));
    iconC.addEventListener("click", controller.newGuess("C"));*/
};