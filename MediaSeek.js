var browser = browser || chrome;

browser.contextMenus.create({
	id: "share-video-at-current-timestamp",
	title: "Share video at current timestamp",
	contexts: ["video"]
}, () => { });

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "share-video-at-current-timestamp") {
		browser.tabs.executeScript(tab.id, { file: "MediaSeekContentScript.js" }, () => {
			browser.tabs.sendMessage(tab.id, { type: 'share-video', srcUrl: info.srcUrl });
		});
	}
});
