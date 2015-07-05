var expect = require('chai').expect;
var NullEncryption = require("net/encryption-null");

describe('Subspace Null Encryption', function() {
    describe('When I generate a Login command',  function() {
        it('for VIE it should equal [0x00,0x01,0x00,0x00,0x00,0x00,0x01,0x00]', function() {
            var nullEncryption = new NullEncryption();
            expect(nullEncryption.login().toJSON()).to.eql([0x00,0x01,0x00,0x00,0x00,0x00,0x01,0x00]);
        });
        it('for Continuum it should equal [0x00,0x01,0x00,0x00,0x00,0x00,0x11,0x00]', function() {
            var nullEncryption = new NullEncryption(true);
            expect(nullEncryption.login().toJSON()).to.eql([0x00,0x01,0x00,0x00,0x00,0x00,0x11,0x00]);
        });
    });
    describe('When i respond to a Login Request', function() {
        it('I respond with the same key to indicate no encryption', function() {
            var nullEncryption = new NullEncryption();
            var loginRequest = new Buffer([0x00,0x01,0x12,0x34,0x56,0x78,0x01,0x00]);
            expect(nullEncryption.reply(loginRequest).toJSON()).to.eql([0x00,0x02,0x12,0x34,0x56,0x78]);
        });
    });
    describe('When i encrypt a message', function() {
        it('the message is not changed', function() {
            var nullEncryption = new NullEncryption();
            var message = new Buffer([0x99,0x77,0x33]);
            expect(nullEncryption.encrypt(message).toJSON()).to.eql(message.toJSON());
        })
    });
    describe('When i decrypt a message', function() {
        it('the message is not changed', function() {
            var nullEncryption = new NullEncryption();
            var message = new Buffer([0x99,0x77,0x33]);
            expect(nullEncryption.decrypt(message).toJSON()).to.eql(message.toJSON());
        })
    });
});