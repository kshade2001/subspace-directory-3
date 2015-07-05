var expect = require('chai').expect;
var HeavyLcg = require("net/heavy-lcg");

describe('Subspace Heavy LCG', function() {
    beforeEach(function() {
        
    });
    describe('For a seed of 0',  function() {
        var heavy = new HeavyLcg();
        it('1 it should return a value of 0x007B', function() {
        var firstValue = heavy.getNextEncryption();
        expect(firstValue).to.equal(0x7B);
        });
        it('2 it should return a value of 0x8BB8 ',function() {
            var secondValue = heavy.getNextEncryption();
            expect(secondValue).to.equal(0x8BB8);
        });
        it('3 it should return a value of 0xDD93 ',function() {
            var thirdValue = heavy.getNextEncryption();
            expect(thirdValue).to.equal(0xDD93);
        });
        it('4 it should return a value of 0xEA33 ',function() {
            var forthValue = heavy.getNextEncryption();
            expect(forthValue).to.equal(0xEA33);
        });
        it('5 it should return a value of 0xC299 ',function() {
            var fifthValue = heavy.getNextEncryption();
            expect(fifthValue).to.equal(0xC299);
        });
        it('6 it should return a value of 0xEE51 ',function() {
            var sixthValue = heavy.getNextEncryption();
            expect(sixthValue).to.equal(0xEE51);
        });
        it('7 it should return a value of 0x0C83 ',function() {
            var sixthValue = heavy.getNextEncryption();
            expect(sixthValue).to.equal(0x0C83);
        });
    });
    describe('for a seed of 0x12345678',  function() {
        var heavy = new HeavyLcg(0x12345678);
        it('it should return a value of 0xEA19', function() {
            var firstValue = heavy.getNextEncryption();
             expect(firstValue).to.equal(0xEA19);
        });
    });
    describe('for a seed of 0xEFFFFFFF',  function() {
        var heavy = new HeavyLcg(0xEFFFFFFF);
        it('it should return a value of 0x39ED', function() {
            var firstValue = heavy.getNextEncryption();
             expect(firstValue).to.equal(0x39ED);
        });
    });
});