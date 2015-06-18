var MLA = MLA || {};

MLA.Controller = function () {
    var model = null,
        view = null;
    
    this.init = function () {
        model = new MLA.Model();
        view = new MLA.View(this);
        model.register(view);
        model.notify();
    };
    
    this.getResource = function () {
        model.getResource();
    };
    this.generate = function () {
        model.getQuestions();
        //model.notify();
    };
};