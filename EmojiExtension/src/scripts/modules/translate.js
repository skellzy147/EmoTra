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

