describe("Question 1", function() {
  var model, aFile, aUser;
  
  beforeEach(function() {
    model = new MLA.Model();
    aUser = model.getUser();
    aFile = "Mā,White\nWhero,Red\nKārera,Light green\nMāwhero,Pink\nKōwhai,Yellow\nKākāriki,Dark green\nMāota,Dark green\nPango,Black\nParauri,Brown\nParaone,Brown\nKahurangi,Blue\nKaraka,Orange\nTitle,COLOURS";
    model.loadedHandler(aFile);
    
  });
  
  // Question 1: loaded file 
  it("The Quiz should have a title of 'COLOURS'", function() {
    expect(aUser.getQuiz().getTitle()).toBe("COLOURS");
  });
  /*
  // Question 2: ID
  it("getID should return Doctors' ID number correctly", function() {
    expect(hospital.findDoctor(11).getID()).toBe(11);
  });
  // Question 3: Name
  it("getName should return Doctors' names correctly", function() {
    expect(hospital.findDoctor(11).getName().toString()).toBe("Xu Jian");
  });
  // Question 4: Office
  it("getOffice should return Doctors' office correctly", function() {
    expect(hospital.findDoctor(11).getOffice().toString()).toBe("N400");
  });
  // Question 5: Fees
  it("getFees should return Doctors' fees correctly", function() {
    expect(hospital.findDoctor(11).getFees()).toBe(50);
  });*/
  
})