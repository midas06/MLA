var MLA = MLA || {};

MLA.Controller = function () {
    "use strict";
    var model = null,
        view = null;
    this.init = function () {
        model = new MLA.Model();
        view = new MLA.View(this);
        model.register(view);
        model.notify();
        document.getElementById("btnReset").style.display = "none";
        document.getElementById("btnGetResource").style.display = "none";
        document.getElementById("resultsPopup").style.display = "none";
        document.getElementById("divResults").style.display = "none";
        document.getElementById("btnChangeQuiz").style.display = "none";
    };
    this.getResource = function () {
        model.getResource();
    };
    this.generate = function () {
        model.getQuestions();
        //model.notify();
    };
    this.retrieveEnglish = function (optionNumber) {
        model.newQuestion.retrieveEnglish(optionNumber);
    };
    this.butWaitTheresMore = function () {
        model.butWaitTheresMore();
        model.notify();
    };
    this.render = function () {
        model.notify();
    };
    this.reload = function () {
        model.reload();
        model.notify();
    };
    this.changeQuiz = function () {
        model.changeQuiz();
        model.notify();
    };
    this.resultsTime = function () {
        model.getResultsTime();
        model.notify();
    };
    this.resultsOrdered = function () {
        model.getResultsOrdered();
        model.notify();
    };
    this.newFile = function () {
        model.reload();
        model.notify();
    };
    this.retryQuiz = function () {
        model.retryQuiz();
        model.notify();
    };
    this.setName = function () {
        model.setName();
        model.notify();
    };
};