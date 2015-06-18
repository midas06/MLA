var MLA = MLA || {};

MLA.View = function (controller) {
    "use strict";
    var spanQuestion = document.getElementById("spanQuestion"),
        spanOptions = document.getElementById("spanOptions"),
        btnGetResource = document.getElementById("btnGetResource"),
        btnReset = document.getElementById("btnReset"),
        linkOptionOne = document.getElementById("linkOptionOne"),
        linkOptionTwo = document.getElementById("linkOptionTwo"),
        linkOptionThree = document.getElementById("linkOptionThree"),
        linkOptionFour = document.getElementById("linkOptionFour");
    this.render = function (model) {
        spanQuestion.innerHTML = model.getSpanQuestion();
        spanOptions.innerHTML = model.getSpanOptions();
        linkOptionOne.innerHTML = model.getLinkOne();
        linkOptionTwo.innerHTML = model.getLinkTwo();
        linkOptionThree.innerHTML = model.getLinkThree();
        linkOptionFour.innerHTML = model.getLinkFour();
    };
    btnGetResource.addEventListener("click", controller.butWaitTheresMore);
    linkOptionOne.addEventListener("click", controller.render);
    linkOptionTwo.addEventListener("click", controller.render);
    linkOptionThree.addEventListener("click", controller.render);
    linkOptionFour.addEventListener("click", controller.render);
    btnReset.addEventListener("click", controller.reload);
};