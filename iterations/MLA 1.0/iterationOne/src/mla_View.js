var MLA = MLA || {};

MLA.View = function (controller) {
    var span = document.getElementById("spanOne"),
        btnGetResource = document.getElementById("btnGetResource"),
        btnGenerate = document.getElementById("btnGenerate");
    
    this.render = function (model) {
        span.innerHTML = model.getQuestions();
    };
    
    btnGetResource.addEventListener("click", controller.getResource);
    btnGenerate.addEventListener("click", controller.generate);
};