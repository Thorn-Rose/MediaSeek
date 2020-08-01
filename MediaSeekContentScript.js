const currentURL = location.protocol + "//" + location.host + location.pathname + location.search;
const urlWithTimeStamp = `${currentURL}#t=${Math.round(document.activeElement.currentTime)}`;
console.log(urlWithTimeStamp);
navigator.clipboard.writeText(urlWithTimeStamp);