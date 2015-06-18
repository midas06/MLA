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
    };
};