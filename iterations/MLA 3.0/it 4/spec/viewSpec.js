describe("On Load, the view", function() {
    var model, aFile, aUser;

    beforeEach(function() {
        model = new MLA.Model();
        aUser = model.getUser();
    });
    
    //7. View element 1
    it("should have an <input> element with 'file' as its id", function () {      
        expect(file).not.toBeNull();
        expect(file.nodeName.toLowerCase()).toBe("input");
    });
    
    //8. View element 2
    it("should have an <audio> element with 'myAudio' as its id", function () {
        expect(myAudio).not.toBeNull();
        expect(myAudio.nodeName.toLowerCase()).toBe("audio");
    });
    
    //9. View element 3
    it("should have a hidden <div> element with 'resultsPopup' as its id", function () {     
        expect(resultsPopup.style.display).toBe("none");
    });
        
});


describe("After loading a file, the View", function () {
    var model, aFile, aUser;

    beforeEach(function() {
        model = new MLA.Model();
        aUser = model.getUser();
        aFile = "Mā,White\nWhero,Red\nKārera,Light green\nMāwhero,Pink\nKōwhai,Yellow\nKākāriki,Dark green\nMāota,Dark green\nPango,Black\nParauri,Brown\nParaone,Brown\nKahurangi,Blue\nKaraka,Orange\nTitle,COLOURS";
        model.loadedHandler(aFile);
        model.butWaitTheresMore();
        $('#linkOptionOne').trigger("click");
    });
    
    // 10. View after load 1
    it("should display a <button> element with 'btnGetResource' as its id", function () {      
        expect(btnGetResource).not.toBeNull();
        expect(btnGetResource.nodeName.toLowerCase()).toBe("button");      
    }); 

});




describe("After finishing the quiz, the View", function() {
    var model, aFile, aUser;

    beforeEach(function() {
        model = new MLA.Model();
        aUser = model.getUser();
        aFile = "Mā,White\nWhero,Red\nKārera,Light green\nMāwhero,Pink\nKōwhai,Yellow\nKākāriki,Dark green\nMāota,Dark green\nPango,Black\nParauri,Brown\nParaone,Brown\nKahurangi,Blue\nKaraka,Orange\nTitle,COLOURS";
        model.loadedHandler(aFile);
        model.butWaitTheresMore();
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
        $('#linkOptionOne').trigger("click");
    });
    
    // 11. View after finished 1
    it ("should display the <div> element with 'resultsPopup' as its id", function () {
        expect(resultsPopup.style.display).toBe("block");
    });
    
    // 12. View after finished 2
    it("the default value of the <input> element with 'inputName' as its id should be 'AAA'", function () { 
        expect(inputName.value).toBe("AAA");
    }); 
    
    // 13. View after finished 3
    it("should change the innerHTML of the <button> element with 'btnReset' as its id to be 'Restart'", function () {
        expect(btnReset.innerHTML).toBe("Restart");
    })

});


