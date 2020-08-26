const common = require("./common");

describe('UI Customisation Options', function() {
    this.timeout(200000);
    before(async function() {
      await common.init();
    });
  
    describe('Navigation', async function() {
      it('Go To Options', async function() {
        let inputElement = '#options';
        await common.clickElement(inputElement);
        await common.testOptionsPage();
      })
    });
    
    describe('UI Customisation', async function() {
      it('Button Colour', async function() {
        await changeUIColour('#cc5354', '#UIbuttonColour')
        await common.testBackgroundColourChange('#twitter', '#cc5354')
      })
      it('Background Colour', async function() {
        await changeUIColour('#f0f2ce', '#UIbackgroundColour');
        await common.testBackgroundColourChange('body', '#f0f2ce')
      })
      it('Header Colour', async function() {
        await changeUIColour('#d6b6db', '#UIheaderColour')
        await common.testBackgroundColourChange('#titleHeader', '#d6b6db');
      })
      it('Button Text Colour', async function() {
        await changeUIColour('#00ff3c', '#UIbuttonTextColour')
        await common.testTextColourChange('#twitter', '#00ff3c')
      })
      it('Button Select Colour', async function(){
        await changeUIColour('#bf1206', '#UISelectedButtonColour')
        await common.testSelectedButtonColourChange('#twitter', '#bf1206')
      })
    });

    after(async function() {
      await common.closeBrowser();
    });
  });

//----------- Actions taken by user -----------
async function changeUIColour(testColour, buttonSelector) {
  await common.navigateToOptions();
  await common.setSelectorValue(buttonSelector, testColour);
  await common.saveOptions();
  await common.navigateToUI();
}
