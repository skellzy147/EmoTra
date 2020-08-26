// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {schemes: ['http', 'https']},
        }
        )],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
  chrome.tabs.onUpdated.addListener(function (tabId , info) {
    if (info.status === 'complete') {
      chrome.storage.sync.get(["userPreference"], function(result){
        if (result.userPreference != "None") {
          var imageURL = chrome.runtime.getURL('/');
          chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(tabs[0].id, { code: 'var config = ' + JSON.stringify(result.userPreference) });
            chrome.tabs.executeScript(tabs[0].id, { code: 'var imageURL = ' + JSON.stringify(imageURL) });
            chrome.tabs.executeScript(tabs[0].id, { file: 'scripts/translationAlgorithm.js' });
          });
        }
      });
    }
  });
});