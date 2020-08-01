var browser = browser || chrome;
var lastTargetElement = null;

document.addEventListener('contextmenu', (event) => {
    lastTargetElement = event.target;
    console.log(lastTargetElement);
}, false);

browser.runtime.onMessage.addListener((message) => {
    if (message && message.type === 'share-video') {
        if (!lastTargetElement) {
            return;
        }

        const videoSource = lastTargetElement.currentSrc ||
            lastTargetElement.getElementsByTagName('source')[0]?.src ||
            message.srcUrl;

        const srcUrl = new URL(videoSource);

        srcUrl.hash = `t=${Math.round(lastTargetElement.currentTime)}`;
        console.log(srcUrl);

        navigator.clipboard.writeText(srcUrl.toString());
    }
});
