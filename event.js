// event.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting=='url') {
        let queryinfo = {'active': true, 'currentWindow': true};
        chrome.tabs.query(queryinfo, function(tabs) {
            sendResponse({farewell: tabs[0].url,title:tabs[0].title});
        });
        return true;
    }
});
