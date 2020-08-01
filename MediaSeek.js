var browser = browser || chrome;

browser.contextMenus.create({
	id: "share-video-at-current-timestamp",
	title: "Share video at current timestamp",
	contexts: ["video"]
}, () => { });

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "share-video-at-current-timestamp") {
		// TODO: More robust error checking ( since srcURL might be empty )
		sourceURL = info.srcUrl;
		browser.tabs.executeScript(tab.id, { file: "MediaSeekContentScript.js" })
		console.log("Right-Click-Menu added successfully");
	}
});
