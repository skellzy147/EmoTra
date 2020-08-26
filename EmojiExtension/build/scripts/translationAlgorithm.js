//Break down variant emojis 
function getEncoding(text) {
    encodedString = "";
    for (let codeTest of text) {
        encodedString += toUTFS(codeTest.codePointAt(0));
    }
    return encodedString;
}
// Based on http://www.2ality.com/2013/09/javascript-unicode.html
// Unique encoding to allow search of database 
// Based on UTF-16, edited slightly to prevent autotranslation to UTF-8 when search is carried out 
function toUTFS(codePoint) {
    var TEN_BITS = parseInt('1111111111', 2);
    function mask(codeUnit) {
        return '0X' + codeUnit.toString(16).toUpperCase();
    }
    if (codePoint <= 0xFFFF) {
        return mask(codePoint);
    }
    codePoint -= 0x10000;
    // Shift right to get to most significant 10 bits
    var leadSurrogate = 0xD800 + (codePoint >> 10);
    // Mask to get least significant 10 bits
    var tailSurrogate = 0xDC00 + (codePoint & TEN_BITS);
    return mask(leadSurrogate) + mask(tailSurrogate);
}

 
 
//make request call to backend api 
function makeRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.status >= 200 && request.readyState == 4) {
            callback(JSON.parse(request.responseText));
        }
    };
    request.open("GET", url, true);
    request.send();
}

function checkIfEmpty(response) {
    return Object.entries(response).length == 0;
}

 
 

function getFontSize(fontSize) {
    if (textFontSize == "default" || textFontSize == "undefined") {
        return fontSize;
    }
    else {
        return textFontSize;
    }
}

function setFontStyle(span) {
    if (!defaultTextColour)
        span.style.color = textColor;
    if (textFont != "default")
        span.style.fontFamily = textFont;
}

    
 
var EMOJI_REGEX = /[\u{1f300}-\u{1f5ff}\u{1f600}-\u{1f64f}\u{1f900}-\u{1f9ff}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug;
var URL_CONST = "http://localhost:5000/emoji/";
var PLAINTEXT_ID = "EMOTRA";

//Recursive Function to iterate through every element within the document
//Breaks down the nodes into their node types and passes to relevant method to find and replace
function replaceElement(element, find, method) {
    for (var i= element.childNodes.length; i-->0;) {
        var child= element.childNodes[i];
        var id = child.className;
        var style = getComputedStyle(element);
        if(id == PLAINTEXT_ID){
            replaceComputedPlainText(child, child.innerHTML, method, style.fontSize);
        }
        if (child.nodeType==1) { // ELEMENT_NODE
            var tag= child.nodeName.toLowerCase();
            if(tag == 'img'){ // IMG_NODE
                replaceImageNode(child, find, method, style.fontSize);
            }
            if (tag!='style' && tag!='script') // special case, don't touch CDATA elements
                replaceElement(child, find, method);
        } else if (child.nodeType==3) { // TEXT_NODE
            replaceTextNode(child, find, method, style.fontSize);
        }
    }
}

//Document Text Nodes
function replaceTextNode(text, find, method, fontSize) {
    var match;
    var matches = [];
    while (match = find.exec(text.data))
        matches.push(match);
    for (var i= matches.length; i-->0;) {
        match= matches[i];
        text.splitText(match.index);
        encodedCodePoint = getEncoding(match);
        var url = URL_CONST + encodedCodePoint;
        makeRequest(url, function(response){
            if(!checkIfEmpty(response)){
                emoji = response[method];
                original = response.emoji;
                if (method == "name")
                    replacePlainText(text, match, emoji, fontSize);
                else
                    replaceImageFromText(text, emoji, match, original, fontSize);
            }
        });
    }
}

//Replace Function for Image Nodes
function replaceImageNode(image, find, method, fontSize){
    text = image.getAttribute('alt');
    if (find.test(text)){
        encodedCodePoint = getEncoding(text);
        var url = URL_CONST + encodedCodePoint;
        makeRequest(url, function(response){
            if(!checkIfEmpty(response)){
                emoji = response[method];
                if (method == "name")
                    replacePlainTextFromImage(image, emoji, fontSize);
                else
                    replaceImageFromImage(image, emoji);
            }
        });
    }
}

//Computed Plain Text Nodes
function replaceComputedPlainText(element, text, method, fontSize){
    var url = URL_CONST + "name/" + text;
    makeRequest(url, function(response){
        if(!checkIfEmpty(response)){
            resultEmoji = response[0];
            imgLink = resultEmoji[method];
            actualEmoji = resultEmoji.emoji;
            if (method != "name"){
                computedPlainTextToImage(element, fontSize);
            }
            else{
                updateComputedPlainText(element, fontSize);
            }
        }
    });
}


//MAIN FUNCTION CALL
syncUserOptions();
replaceElement(document.body, EMOJI_REGEX, config);

//set user values to global variables
function syncUserOptions() {
    chrome.storage.sync.get(["plainTextFontSize", "plainTextColour", "defaultTextColour", "plainTextFont"], function (result) {
        textFontSize = result.plainTextFontSize;
        textColor = result.plainTextColour;
        defaultTextColour = result.defaultTextColour;
        textFont = result.plainTextFont;
    });
}


 
 

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
 
 
 
 
 
 
 