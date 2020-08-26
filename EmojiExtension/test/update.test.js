var assert = require('assert'),
    update = require('../src/scripts/modules/update.js'),
    jsdom = require('jsdom')

const {JSDOM} = jsdom;

describe('Update Web Pages', function(){
    describe('Update Web Elements', function (){
        before(function() {
            return JSDOM.fromFile('test/html/unitTestPage.html')
            .then((dom) => {
                global.window = dom.window;
                global.document = window.document;
                global.defaultTextColour = true;
                global.textFont = "default";
                global.textFontSize = "14px";
                global.PLAINTEXT_ID = "TESTID"
                global.imageURL = "file:///Users/sarah/EmojiTranslator/EmojiExtension/test/images/"
                global.expectedURL = imageURL + "replaced.png"
            });
            });
        it('Replace Image with PlainText', function(){
            img = document.getElementById("img1")
            update.replacePlainTextFromImage(img, "test", "14px")
            insertedElement = document.querySelector('.' + PLAINTEXT_ID)
            assert.equal(insertedElement.innerHTML, "test")
        });
        it('Update Computed Plain Text Fonts', function(){
            plaintext = document.getElementById("testSpan3")
            update.updateComputedPlainText(plaintext, textFontSize)
            assert.equal(plaintext.style.fontSize, textFontSize)
        });
        it('Replace Image with New Image', function(){
            img = document.getElementById("img2")
            expectedURL = imageURL + "replaced.png"
            update.replaceImageFromImage(img, "replaced.png")
            assert.equal(img.src, expectedURL)
        });
        it('Computed Plain Text to Image', function(){
            plainText = document.getElementById("plainText1")
            imgLink = "replaced.png"
            actualEmoji = "altTagPlaceholder"
            update.computedPlainTextToImage(plainText, "14px")
            newImg = plainText.childNodes[0]
            assert.equal(plainText.childNodes.length, 1)
            assert.equal(newImg.src, expectedURL)
        });
        it('Replace Plain Text', function(){
            PLAINTEXT_ID = "uniqueID1"
            plainText = document.getElementById("plainText2")
            match = ["Replace"]
            update.replacePlainText(plainText, match, "SUCCESS", "14px")
            insertedElement = document.querySelector('.'+PLAINTEXT_ID)
            assert.equal(insertedElement.innerHTML, "SUCCESS")
        });
        it('Replace Plain Text', function(){
            PLAINTEXT_ID = "uniqueID2"
            plainText = document.getElementById("plainText3")
            match = ["Replace"]
            update.replaceImageFromText(plainText, "replaced.png", match, PLAINTEXT_ID, "14px")
            assert.equal(plainText.childNodes.length, 1)
        });
    });
});