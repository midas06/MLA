var MLA = MLA || {};

MLA.View = function (controller) {
    "use strict";
    var spanQuestion = document.getElementById("spanQuestion"),
        spanOptions = document.getElementById("spanOptions"),
        spanTitle = document.getElementById("spanTitle"),
        btnGetResource = document.getElementById("btnGetResource"),
        btnReset = document.getElementById("btnReset"),
        btnChangeQuiz = document.getElementById("btnChangeQuiz"),
        btnResultsTime = document.getElementById("btnResultsTime"),
        btnResultsOrdered = document.getElementById("btnResultsOrdered"),
        fileReader = document.getElementById("file"),
        linkOptionOne = document.getElementById("linkOptionOne"),
        linkOptionTwo = document.getElementById("linkOptionTwo"),
        linkOptionThree = document.getElementById("linkOptionThree"),
        linkOptionFour = document.getElementById("linkOptionFour"),
        btnName = document.getElementById("btnName");
        
    this.render = function (model) {
        spanQuestion.innerHTML = model.getSpanQuestion();
        spanOptions.innerHTML = model.getSpanOptions();
        spanTitle.innerHTML = model.getSpanTitle();
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
    btnReset.addEventListener("click", controller.retryQuiz);
    btnResultsTime.addEventListener("click", controller.resultsTime);
    btnResultsOrdered.addEventListener("click", controller.resultsOrdered);
    btnName.addEventListener("click", controller.setName);
    btnChangeQuiz.addEventListener("click", controller.changeQuiz);
}; // 21