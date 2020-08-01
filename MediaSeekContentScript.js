var browser = browser || chrome;
var lastTargetElement = null;

const writeUrlToClipboard = (url) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(srcUrl.toString());
    } else {
        const element = document.createElement('textarea');

        element.value = url.toString();
        element.style.position = 'fixed';
        element.style.opacity  = '0';

        document.body.appendChild(element);

        element.focus();
        element.select();

        document.execCommand('copy');
        document.body.removeChild(element);
    }
};

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

        writeUrlToClipboard(srcUrl);
    }
});
