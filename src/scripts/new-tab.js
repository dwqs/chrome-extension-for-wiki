/**
 * Created by pomy on 09/07/2017.
 */

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message) {
        // create tab to open wiki url
        chrome.tabs.create({
            url: message
        }, function (tab) {

        });
    }
});
