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

exports.toUTFS = toUTFS;
exports.getEncoding = getEncoding;