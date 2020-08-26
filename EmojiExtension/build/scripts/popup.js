'use strict';

const allButtonList = ["name", "google", "facebook", "apple", "twitter", "options"]
const translationButtonList = ["name", "google", "facebook", "apple", "twitter"]
var UIbuttonColour, UIheaderColour, UIbackgroundColour, UIbuttonTextColour, userPreference, UISelectedButtonColour;
//establish function for translation buttons
for (let trans of translationButtonList){
  document.getElementById(trans).onclick = translationChosen;
}

//Options functions
let optionsButton = document.getElementById('options')
optionsButton.onclick = function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('../options.html'));
  }
};

//when translation button clicked
function translationChosen(element) {
  toggleDisplay(element.target)
}

function translateDocument(element) {
  let translateOption = element.id;
  var imageURL = chrome.runtime.getURL('/');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: 'var config = ' + JSON.stringify(translateOption) });
    chrome.tabs.executeScript(tabs[0].id, { code: 'var imageURL = ' + JSON.stringify(imageURL) });
    //this file is only available on build, it is all the modules concatenated together
    chrome.tabs.executeScript(tabs[0].id, { file: 'scripts/translationAlgorithm.js' });
  });
}

//console log helper method
function logToConsole(string) { 
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {code: 'console.log("' + string + '")'});
  });
}

//update the ui based on the user preferences
chrome.storage.sync.get(["UIbuttonColour", "UIheaderColour", "UIbackgroundColour", "UIbuttonTextColour", "UISelectedButtonColour", "userPreference"], function(result){
  UIbuttonColour = result.UIbuttonColour;
  UIheaderColour = result.UIheaderColour; 
  UIbackgroundColour = result.UIbackgroundColour; 
  UIbuttonTextColour = result.UIbuttonTextColour;
  UISelectedButtonColour = result.UISelectedButtonColour;
  userPreference = result.userPreference;
  updateUI()
});


function updateUI(){
  document.body.style.background = UIbackgroundColour;
  document.getElementById('titleHeader').style.background = UIheaderColour;
  document.querySelectorAll("button").forEach(el => {
    el.style.background = UIbuttonColour;
    el.style.color = UIbuttonTextColour;
  });
  if(userPreference != "None") {
    document.getElementById(userPreference).style.background = UISelectedButtonColour;
  }
}

function toggleDisplay(element){
  chrome.storage.sync.get(["userPreference"], function(result){
    if (result.userPreference == element.id) {
      removeTranslation(element)
    }
    else{
      translateDocument(element);
      setNewTranslation(element);
    }
  });
}

function setNewTranslation(element) {
  chrome.storage.sync.set({
    userPreference: element.id
  }, function () {
    logToConsole('SETTINGS CHANGED ' + element.id);
  });
  document.querySelectorAll("button").forEach(el => {
    el.style.background = UIbuttonColour;
  });
  element.style.background = UISelectedButtonColour;
}

function removeTranslation(element){
  chrome.storage.sync.set({
    userPreference: "None"
  }, function () {
    logToConsole('SETTINGS CHANGED TRANSLATION REMOVED');
  });
  element.style.background = UIbuttonColour;
}
