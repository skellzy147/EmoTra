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

exports.setFontStyle = setFontStyle;   
exports.getFontSize = getFontSize;