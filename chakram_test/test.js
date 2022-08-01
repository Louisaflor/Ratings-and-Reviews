var chakram = require('chakram');
expect = chakram.expect;


describe("API Testing For /reviews GET request", function() {
  it("Should provide a status code 200", function() {
    let id = Math.floor(Math.random()*99999);
    var resposne = chakram.get(`http://localhost:3100/reviews?product_id=${id}`);
    return expect(resposne).to.have.status(200);
  })
});

describe("API Testing For /reviews/meta GET request", function() {
  it("Should provide a status code 200", function() {
    let id = Math.floor(Math.random()*99999);
    var resposne = chakram.get(`http://localhost:3100/reviews/meta?product_id=${id}`);
    return expect(resposne).to.have.status(200);
  })
});
