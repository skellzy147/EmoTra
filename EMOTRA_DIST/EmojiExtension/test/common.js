const puppeteer = require('puppeteer');
const extensionPath = './build/';
const extensionID = "ajalcaooagpeoefgedibfjfmpcjhckpm";
const extensionPopupHtml = 'popup.html';
const extensionOptionsHtml = 'options.html'
const assert = require('assert')
const emojiListText = ["dog face", "zipper-mouth face", "avocado"]
const emojiListCodepoint = ["1f436", "1f910", "1f951"]
let browser;

//-------------------------------------------------------
//----------- Setup Functions ---------------------------

let common = {};
common.init = async function () {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });
  extensionPage = await browser.newPage();
  await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHtml}`);
}


common.navigateToOptions = async function () {
    await extensionPage.goto(`chrome-extension://${extensionID}/${extensionOptionsHtml}`);
}
  
common.navigateToUI = async function () {
    await extensionPage.goto(`chrome-extension://${extensionID}/${extensionPopupHtml}`);
}

common.navigateToPage = async function(page) {
    pageLink = formatLink(page)
    await extensionPage.goto(pageLink)
}

common.clickElement = async function (inputElement) {
    await extensionPage.evaluate((inputElement) => 
        document.querySelector(inputElement).click(), inputElement);
}

common.setSelectorValue = async function(selector, value) {
    await extensionPage.waitForSelector(selector);
    extensionPage.evaluate((selector, value) => {
        document.querySelector(selector).value = value;
    }, selector, value)
}

common.saveOptions = async function(){
    let saveButton = '#save';
    await extensionPage.evaluate((saveButton) => 
        document.querySelector(saveButton).click(), saveButton);
}

//TEST FUNCTIONS
common.testOptionsPage =  async function () {
    const [dummy, mainPage, options] = (await browser.pages());
    assert.equal(await options.title(), "Extensions - EReTra");
    options.close();
}

common.testBackgroundColourChange = async function (testSelector, testColour) {
    const elementColour = await getStyleOption(extensionPage, testSelector, "backgroundColor");
    assert.equal(getRGB(elementColour), testColour);
}

common.testTextColourChange = async function (testSelector, testColour) {
    const elementColour = await getStyleOption(extensionPage, testSelector, "color");
    assert.equal(getRGB(elementColour), testColour);
}

common.testSelectedButtonColourChange = async function (testSelector, testColour) { 
    await common.clickElement(testSelector)
    await common.testBackgroundColourChange(testSelector, testColour)
}

common.testImageTranslation = async function(format) {
    var emojiListIndex = 0
    var imageList = extensionPage.evaluate(() => { 
        return document.querySelectorAll("img") });
    for(let img in imageList){
        assert.equal(compareImageLink(img, format, emojiListIndex), true)
        emojiListIndex += 1
    }
}

common.testPlainTextTranslation = async function() {
    var emojiListIndex = 0
    var plainTextList = await extensionPage.evaluate(() => { 
        let elements = Array.from(document.querySelectorAll(".EMOTRA"));
        let links = elements.map(element => {
            return element.innerHTML
        })
        return links;
    });
    plainTextList.forEach(function(item, index) {
        assert.equal(item, emojiListText[emojiListIndex])
        emojiListIndex += 1
    });
}

common.closeBrowser = async function(){
    await browser.close()
}
//-------------------------------------------------------
//------------Private Helper Functions-------------------

async function compareImageLink(image, format, listIndex){
    var desiredLink = "img-" + format + "-64/" + emojiListCodepoint[listIndex] + ".png"
    return (image.src).contains(desiredLink)
}
async function getStyleOption(page, selector, styleOption) {
    return await page.evaluate((selector, styleOption) => {
        const btn = document.querySelector(selector);
        json = JSON.parse(JSON.stringify(getComputedStyle(btn)));
        return json[styleOption];
    }, selector, styleOption);
}

//-------Misc Functions ---------------------------------
//Helper Functions for stripping RGB to Hex for colour matching
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(parseInt(r)) + componentToHex(parseInt(g)) + componentToHex(parseInt(b));
}
  
function getRGB(str){
    var match = str.match(/rgb?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return rgbToHex(match[1], match[2], match[3])
}
  
function formatLink(link){
    return "http://localhost:1337/" + link +".html"
}


module.exports = common