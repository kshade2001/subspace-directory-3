var expect = require('chai').expect;
var proxyquire = require('proxyquire').noCallThru();

proxyquire('net/encryption-vie', {
    'crypto' : { 
        randomBytes: function(size)  {
            var buffer = new Buffer(size);
            buffer.fill(0xAA);
            return buffer;
        }
    }
});

var VieEncryption = require("net/encryption-vie");
  
describe('Subspace VIE Encryption', function() {
    describe('When I generate a Login command using key 0xAAAAAAAA',  function() {
        it('for VIE it should equal [0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x01,0x00]', function() {
            var vieEncryption = new VieEncryption();
            expect(vieEncryption.login().toJSON()).to.eql([0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x01,0x00]);
        });
        it('for Continuum it should equal [0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x11,0x00]', function() {
            var vieEncryption = new VieEncryption(true);
            expect(vieEncryption.login().toJSON()).to.eql([0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x11,0x00]);
        });
    });
    describe('When i respond to a Login  of  [0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x01,0x00]', function() {
         var vieEncryption, loginRequest;
        beforeEach(function() {
            vieEncryption = new VieEncryption();
            loginRequest = new Buffer([0x00,0x01,0xAA,0xAA,0xAA,0xAA,0x01,0x00]);
        });
        it('I respond with the a postive version of the key [0x00,0x02,0x56,0x55,0x55,0x55]', function() {
          
            expect(vieEncryption.reply(loginRequest).toJSON()).to.eql([0x00,0x02,0x56,0x55,0x55,0x55]);
            expect(vieEncryption._key).to.equal(0x55555556);
        });
        describe('When i have an encryption key 0x55555556', function() {
             beforeEach(function() {
                 vieEncryption.reply(loginRequest);
             });
            describe('When i encrypt the a core packet [0x00,0x04,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB]', function() {
                it('the message is encrypted ', function() {
                    expect(vieEncryption.encrypt(new Buffer([0x00,0x04,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB])).toJSON())
                        .to.eql([0x00,0x04,0xB4,0x43,0xA0,0x34,0xBA,0x96,0xDA]);
                })
            });
            describe('When i decrypt a core packet [0x00,0x04,0xB4,0x43,0xA0,0x34,0xBA,0x96,0xDA]', function() {
                it('the message is decrypted', function() {
                      expect(vieEncryption.decrypt(new Buffer([0x00,0x04,0xB4,0x43,0xA0,0x34,0xBA,0x96,0xDA])).toJSON())
                        .to.eql([0x00,0x04,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB,0xBB]);
                })
            });
        });
    });
    
});