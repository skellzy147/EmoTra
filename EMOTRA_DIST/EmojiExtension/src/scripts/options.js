// Saves options to chrome.storage
function save_options() {
  var plainTextFontSize = document.getElementById('plainTextFontSize').value;
  var plainTextColour = document.getElementById('plainTextColour').value;
  var defaultTextColour = document.getElementById('defaultTextColour').checked;
  var plainTextFont = document.getElementById('plainTextFont').value;
  var UIbuttonColour = document.getElementById('UIbuttonColour').value;
  var UIheaderColour = document.getElementById('UIheaderColour').value;
  var UIbackgroundColour = document.getElementById('UIbackgroundColour').value;
  var UIbuttonTextColour = document.getElementById('UIbuttonTextColour').value;
  var UISelectedButtonColour = document.getElementById('UISelectedButtonColour').value;
  
  chrome.storage.sync.set({
    plainTextFontSize : plainTextFontSize,
    plainTextColour : plainTextColour,
    defaultTextColour : defaultTextColour,
    plainTextFont : plainTextFont,
    UIbuttonColour : UIbuttonColour,
    UIheaderColour : UIheaderColour,
    UIbackgroundColour : UIbackgroundColour,
    UIbuttonTextColour : UIbuttonTextColour,
    UISelectedButtonColour : UISelectedButtonColour
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    plainTextFontSize: "default",
    plainTextColour: "#000000",
    defaultTextColour: "on",
    plainTextFont: "default",
    UIbuttonColour: "#befaf9",
    UIheaderColour: "#befaf9",
    UIbackgroundColour: "#befaf9",
    UIbuttonTextColour: "#000000",
    UISelectedButtonColour: "#bef2f3"
  }, function(items) {
    document.getElementById('plainTextFontSize').value = items.plainTextFontSize;
    document.getElementById('plainTextColour').value = items.plainTextColour;
    document.getElementById('defaultTextColour').value = items.defaultTextColour;
    document.getElementById('plainTextFont').value = items.plainTextFont;
    document.getElementById('UIbuttonColour').value = items.UIbuttonColour;
    document.getElementById('UIheaderColour').value = items.UIheaderColour;
    document.getElementById('UIbackgroundColour').value = items.UIbackgroundColour;
    document.getElementById('UIbuttonTextColour').value = items.UIbuttonTextColour;
    document.getElementById('UISelectedButtonColour').value = items.UISelectedButtonColour;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);