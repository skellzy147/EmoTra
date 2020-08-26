var assert = require('assert'),
    style = require('../src/scripts/modules/style.js'),
    jsdom = require('jsdom')

const {JSDOM} = jsdom;

let fontSize = '14px'
describe('Style Changes', function() {
    describe('Set Font Size', function (){
        it('Returns Normal Font Size if option is Default', function(){
            textFontSize = "default"
            assert.equal(fontSize, style.getFontSize(fontSize))
        });
        it('Returns Normal Font Size if option is Undefined', function(){
            textFontSize = "undefined"
            assert.equal(fontSize, style.getFontSize(fontSize))
        });
        it('Returns New Font Size if option is not default or undefined', function(){
            textFontSize = "18px"
            assert.equal(textFontSize, style.getFontSize(fontSize))
            assert.notEqual(fontSize, textFontSize)
        });
    })

    describe('Set Font Colour', function (){
        before(function() {
            return JSDOM.fromFile('test/html/unitTestPage.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                global.spanElement = document.getElementById("testSpan1");
                global.textColor = "blue"
                global.defaultTextColour = true;
                global.textFont = "default";
                global.originalFont = spanElement.style.fontFamily;
                global.originalColor = spanElement.style.color;
                global.textFont = "default";
            });
            });
        it('Text Font Default', function(){
            style.setFontStyle(spanElement);
            assert.equal(spanElement.style.fontFamily, originalFont);
            assert.notEqual(spanElement.style.fontFamily, textFont)
        });
        it('Text Colour Default', function(){
            style.setFontStyle(spanElement);
            assert.equal(spanElement.style.color, originalColor);
            assert.notEqual(spanElement.style.color, textColor)
        });
        it('Text Font Not Default', function(){
            textFont = "Impact";
            style.setFontStyle(spanElement);
            assert.notEqual(spanElement.style.fontFamily, originalFont);
            assert.equal(spanElement.style.fontFamily, textFont)
        });
        it('Text Colour Not Default', function(){
            defaultTextColour = false;
            style.setFontStyle(spanElement);
            assert.notEqual(spanElement.style.color, originalColor);
            assert.equal(spanElement.style.color, textColor)
        });
    })
})
