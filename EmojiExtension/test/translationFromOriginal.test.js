const common = require("./common");

const EMBEDDEDTEXT_PAGE = "embeddedTextTestPage";
const IMAGE_PAGE_APPLE_EMOJI_ALT = "imgTestPageAppleEmojiAlt";
const IMAGE_PAGE_FACEBOOK_EMOJI_ALT = "imgTestPageFacebookEmojiAlt";
const IMAGE_PAGE_GOOGLE_EMOJI_ALT = "imgTestPageGoogleEmojiAlt";
const IMAGE_PAGE_TWITTER_EMOJI_ALT = "imgTestPageTwitterEmojiAlt";
const IMAGE_PAGE_APPLE_TEXT_ALT = "imgTestPageAppleEmojiAlt";
const IMAGE_PAGE_FACEBOOK_TEXT_ALT = "imgTestPageFacebookEmojiAlt";
const IMAGE_PAGE_GOOGLE_TEXT_ALT = "imgTestPageGoogleEmojiAlt";
const IMAGE_PAGE_TWITTER_TEXT_ALT = "imgTestPageTwitterEmojiAlt";
describe('Translation Normal Text', function() {
    this.timeout(200000);
    before(async function() {
      await common.init();
    });
  
    describe('Embedded Text', async function() {
      it('Twitter', async function() {
        let inputElement = '#twitter';
        await makeTranslationSelection(inputElement, EMBEDDEDTEXT_PAGE)
        await common.testImageTranslation('twitter')
      })
      it('Facebook', async function() {
        let inputElement = '#facebook';
        await makeTranslationSelection(inputElement, EMBEDDEDTEXT_PAGE)
        await common.testImageTranslation('facebook')
      })
      it('Google', async function() {
        let inputElement = '#google';
        await makeTranslationSelection(inputElement, EMBEDDEDTEXT_PAGE)
        await common.testImageTranslation('google')
      })
      it('Apple', async function() {
        let inputElement = '#apple';
        await makeTranslationSelection(inputElement, EMBEDDEDTEXT_PAGE)
        await common.testImageTranslation('apple')
      })
      it('Plain Text', async function() {
        let inputElement = '#name';
        await makeTranslationSelection(inputElement, EMBEDDEDTEXT_PAGE)
        await common.testPlainTextTranslation()
      })
    });

    describe('Images With Emoji Alt Tag', async function() {
      describe('Apple Images', async function() {
        it('Twitter Translation', async function() {
          let inputElement = '#twitter';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_EMOJI_ALT)
          await common.testImageTranslation('twitter')
        })
        it('Facebook Translation', async function() {
          let inputElement = '#facebook';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_EMOJI_ALT)
          await common.testImageTranslation('facebook')
        })
        it('Google Translation', async function() {
          let inputElement = '#google';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_EMOJI_ALT)
          await common.testImageTranslation('google')
        })
        it('Plain Text Translation', async function() {
          let inputElement = '#name';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_EMOJI_ALT)
          await common.testPlainTextTranslation()
        })
      });

      describe('Facebook Images', async function() {
        it('Twitter Translation', async function() {
          let inputElement = '#twitter';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_EMOJI_ALT)
          await common.testImageTranslation('twitter')
        })
        it('Apple Translation', async function() {
          let inputElement = '#apple';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_EMOJI_ALT)
          await common.testImageTranslation('apple')
        })
        it('Google Translation', async function() {
          let inputElement = '#google';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_EMOJI_ALT)
          await common.testImageTranslation('google')
        })
        it('Plain Text Translation', async function() {
          let inputElement = '#name';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_EMOJI_ALT)
          await common.testPlainTextTranslation()
        })
      });

      describe('Google Images', async function() {
        it('Twitter Translation', async function() {
          let inputElement = '#twitter';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_EMOJI_ALT)
          await common.testImageTranslation('twitter')
        })
        it('Apple Translation', async function() {
          let inputElement = '#apple';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_EMOJI_ALT)
          await common.testImageTranslation('apple')
        })
        it('Facebook Translation', async function() {
          let inputElement = '#facebook';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_EMOJI_ALT)
          await common.testImageTranslation('facebook')
        })
        it('Plain Text Translation', async function() {
          let inputElement = '#name';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_EMOJI_ALT)
          await common.testPlainTextTranslation()
        })
      });

      describe('Twitter Images', async function() {
        it('Google Translation', async function() {
          let inputElement = '#google';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_EMOJI_ALT)
          await common.testImageTranslation('google')
        })
        it('Apple Translation', async function() {
          let inputElement = '#apple';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_EMOJI_ALT)
          await common.testImageTranslation('apple')
        })
        it('Facebook Translation', async function() {
          let inputElement = '#facebook';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_EMOJI_ALT)
          await common.testImageTranslation('facebook')
        })
        it('Plain Text Translation', async function() {
          let inputElement = '#name';
          await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_EMOJI_ALT)
          await common.testPlainTextTranslation()
        })
      });
  });

  describe('Images With Text Alt Tag', async function() {
    describe('Apple Images', async function() {
      it('Twitter Translation', async function() {
        let inputElement = '#twitter';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_TEXT_ALT)
        await common.testImageTranslation('twitter')
      })
      it('Facebook Translation', async function() {
        let inputElement = '#facebook';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_TEXT_ALT)
        await common.testImageTranslation('facebook')
      })
      it('Google Translation', async function() {
        let inputElement = '#google';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_TEXT_ALT)
        await common.testImageTranslation('google')
      })
      it('Plain Text Translation', async function() {
        let inputElement = '#name';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_APPLE_TEXT_ALT)
        await common.testPlainTextTranslation()
      })
    });

    describe('Facebook Images', async function() {
      it('Twitter Translation', async function() {
        let inputElement = '#twitter';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_TEXT_ALT)
        await common.testImageTranslation('twitter')
      })
      it('Apple Translation', async function() {
        let inputElement = '#apple';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_TEXT_ALT)
        await common.testImageTranslation('apple')
      })
      it('Google Translation', async function() {
        let inputElement = '#google';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_TEXT_ALT)
        await common.testImageTranslation('google')
      })
      it('Plain Text Translation', async function() {
        let inputElement = '#name';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_FACEBOOK_TEXT_ALT)
        await common.testPlainTextTranslation()
      })
    });

    describe('Google Images', async function() {
      it('Twitter Translation', async function() {
        let inputElement = '#twitter';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_TEXT_ALT)
        await common.testImageTranslation('twitter')
      })
      it('Apple Translation', async function() {
        let inputElement = '#apple';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_TEXT_ALT)
        await common.testImageTranslation('apple')
      })
      it('Facebook Translation', async function() {
        let inputElement = '#facebook';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_TEXT_ALT)
        await common.testImageTranslation('facebook')
      })
      it('Plain Text Translation', async function() {
        let inputElement = '#name';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_GOOGLE_TEXT_ALT)
        await common.testPlainTextTranslation()
      })
    });

    describe('Twitter Images', async function() {
      it('Google Translation', async function() {
        let inputElement = '#google';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_TEXT_ALT)
        await common.testImageTranslation('google')
      })
      it('Apple Translation', async function() {
        let inputElement = '#apple';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_TEXT_ALT)
        await common.testImageTranslation('apple')
      })
      it('Facebook Translation', async function() {
        let inputElement = '#facebook';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_TEXT_ALT)
        await common.testImageTranslation('facebook')
      })
      it('Plain Text Translation', async function() {
        let inputElement = '#name';
        await makeTranslationSelection(inputElement, IMAGE_PAGE_TWITTER_TEXT_ALT)
        await common.testPlainTextTranslation()
      })
    });
});


    after(async function() {
      await common.closeBrowser();
    });
  });

//----------- Actions taken by user -----------
async function makeTranslationSelection(buttonSelector, page) {
  await common.navigateToUI();
  await common.clickElement(buttonSelector);
  await common.navigateToPage(page);
}
