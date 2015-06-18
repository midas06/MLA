describe("The App", function() {
    var model, aFile, aUser;

    beforeEach(function() {
        model = new MLA.Model();
        aUser = model.getUser();
        aFile = "Mā,White\nWhero,Red\nKārera,Light green\nMāwhero,Pink\nKōwhai,Yellow\nKākāriki,Dark green\nMāota,Dark green\nPango,Black\nParauri,Brown\nParaone,Brown\nKahurangi,Blue\nKaraka,Orange\nTitle,COLOURS";
        model.loadedHandler(aFile);
        model.butWaitTheresMore();
        $('#linkOptionOne').trigger("click");
    });

    // Test 1: loaded file 
    it("should determine that the file has a title of 'COLOURS'", function() {
        expect(aUser.getQuiz().getTitle()).toBe("COLOURS");
    });

    // Test 2: file processes
    it("should convert the list of words into an 2d array, with each element in the array comprising of a Maori and English set of words", function() {
        expect(aUser.getQuiz().getQuestionArray()[0].length).toBe(2);
    });

    // Test 3: question generates
    it("should create a question array, comprising of the resource and 3 random dummy answers", function() {
        expect(aUser.getQuiz().getQuestionArray().length).toBe(4);

        expect(aUser.getQuiz().getQuestionArray()).toContain(aUser.getQuiz().getTheResource());
    });

    // Test 4: the timer should start
    it("should create and start a Timer when the Quiz begins", function () {
        expect(aUser.getQuiz().getTimer()).not.toBe(null);
    });

    // Test 5: if a question is answered, the answer should be stored
    it("should store the history of an answered question", function() {
        expect(aUser.getQuiz().getTheHistory().length).not.toBe(0);
    });

    // Test 6: history contents
    it("should store each element in the history array as an object, and each history object should contain the question, the list of possible answers, the User's guess, and the correct answer", function() {
        expect(aUser.getQuiz().getTheHistory()[0]).toEqual(jasmine.any(Object));
        expect(aUser.getQuiz().getTheHistory()[0].specGetQuestion()).toEqual(jasmine.any(String));
        expect(aUser.getQuiz().getTheHistory()[0].specGetOptions()).toEqual(jasmine.any(Array));
        expect(aUser.getQuiz().getTheHistory()[0].specGetTheAnswer()).toEqual(jasmine.any(String));
        expect(aUser.getQuiz().getTheHistory()[0].specGetCorrect()).toEqual(jasmine.any(Boolean));
    });

});