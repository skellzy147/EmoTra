var assert = require('assert'),
    encode = require('../src/scripts/modules/encode.js')

describe('Encoding Values', function() { 
    describe('getEncoding', function (){
        it('Returns encoded value for simple emoji', function(){
            assert.equal('0X263A', encode.getEncoding('☺'))
        });
        it('Returns encoded value for same simple emoji with different coding', function(){
            assert.equal('0X263A0XFE0F', encode.getEncoding('☺️'))
        });
        it('Returns encoded value for complex emoji', function(){
            assert.equal('0XD83D0XDC94', encode.getEncoding('💔'))
        });
        it('Returns encoded value for variant emoji', function(){
            assert.equal('0XD83E0XDD360XD83C0XDFFE', encode.getEncoding('🤶🏾'))
        });
    });

    describe('to UTFS', function (){
        it('Returns UTF-S value from javascript encoding', function(){
            assert.equal('0XD83D0XDC04', encode.getEncoding('\uD83D\uDC04'))
        });
    });
});