var browser = browser || chrome;

var mediaShareMessageListener = mediaShareMessageListener || function (message) {
    if (message && message.type === 'share-video') {
        const srcUrl  = new URL(message.srcUrl);
        const element = document.querySelector(`video source[src="${message.srcUrl}"]`).closest('video');

        srcUrl.hash = `t=${Math.round(element.currentTime)}`;
        console.log(srcUrl);

        navigator.clipboard.writeText(srcUrl.toString());
    }
};

if (!browser.runtime.onMessage.hasListener(mediaShareMessageListener)) {
    browser.runtime.onMessage.addListener(mediaShareMessageListener);
}
