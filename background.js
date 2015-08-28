chrome.tabs.onUpdated.addListener(function(id, info, tab){
	chrome.pageAction.show(tab.id);
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.do_thing == "delete") {
		chrome.history.deleteUrl({url: message.url});
	}
});