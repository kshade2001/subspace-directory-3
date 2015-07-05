var expect = require('chai').expect;
var LightLcg = require("net/light-lcg");

describe('Subspace Light LCG', function() {
    beforeEach(function() {
        
    });
    describe('For a seed of 0',  function() {
        var light = new LightLcg();
        it('it should return a value of 2471', function() {
        var firstValue = light.getNext();
        expect(firstValue).to.equal(2471);
        });
        it('it should return a vaue of 2 ',function() {
            var secondValue = light.getNext();
            expect(secondValue).to.equal(2531);
        });
    });
    describe('for a seed of 0xFFFFFFFF',  function() {
        var light = new LightLcg(0xFFFFFFFF);
        it('it should return a value of 2262', function() {
        var firstValue = light.getNext();
        expect(firstValue).to.equal(2262);
        });
    });
});