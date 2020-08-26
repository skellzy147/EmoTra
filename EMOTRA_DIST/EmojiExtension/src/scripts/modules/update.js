var {getFontSize} = require('./style.js');
var {setFontStyle} = require('./style.js');

//update plain text already set by app
function updateComputedPlainText(element, fontSize) {
    element.style.fontSize = getFontSize(fontSize);
    setFontStyle(element);
}

//Replace document text with plain text
function replacePlainText(text, match, emoji, fontSize) {
    var span = document.createElement('span');
    span.style.fontSize = getFontSize(fontSize);
    setFontStyle(span);
    span.className = PLAINTEXT_ID;
    span.appendChild(document.createTextNode(emoji));
    try {
        text.nextSibling.splitText(match[0].length);
    }
    catch (e) { }
    text.parentNode.replaceChild(span, text.nextSibling);
}

//Replace image with plain text
function replacePlainTextFromImage(image, emoji, fontSize) {
    var span = document.createElement('span');
    span.className = PLAINTEXT_ID;
    span.style.fontSize = getFontSize(fontSize);
    setFontStyle(span);
    span.appendChild(document.createTextNode(emoji));
    image.parentNode.replaceChild(span, image);
}

//Replace computed plain text with an image
function computedPlainTextToImage(element, fontSize) {
    var span = element;
    span.innerHTML = "";
    span.id = ""; //clear inner HTML
    var img = createImageNode(fontSize, imgLink, actualEmoji);
    span.appendChild(img);
}

//Replace image with image
function replaceImageFromImage(image, emoji) {
    image.src = imageURL + emoji;
}

//Replace document text with image 
function replaceImageFromText(text, imgLink, match, original, fontSize) {
    var span = document.createElement('span');
    var img = createImageNode(fontSize, imgLink, original);
    span.appendChild(img);
    try {
        text.nextSibling.splitText(match[0].length);
    }
    catch (e) { } //ignore error caused by syncronisation
    text.parentNode.replaceChild(span, text.nextSibling);
}

//create image node helper function
function createImageNode(fontSize, path, altTag) {
    var img = document.createElement('img');
    img.style.height = fontSize;
    img.alt = altTag;
    img.src = imageURL + path;
    return img;
}

//exports for testing purposes
exports.updateComputedPlainText = updateComputedPlainText;
exports.replacePlainText = replacePlainText;
exports.replacePlainTextFromImage = replacePlainTextFromImage;
exports.computedPlainTextToImage = computedPlainTextToImage;
exports.replaceImageFromImage = replaceImageFromImage;
exports.replaceImageFromText = replaceImageFromText;
exports.createImageNode = createImageNode;