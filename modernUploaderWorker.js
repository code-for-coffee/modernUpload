//console.log("[Worker]: modernUploaderWorker.js has started");
onmessage = function(event) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            postMessage(200);
        } else if (xhr.readyState == 4 && status == 500) {
            postMessage(500);
        }
    }
    //console.log(event.data.Count);
    for (var i = 0; i < event.data.Count; i++) {
        xhr.open("POST", event.data.Server, false);
        xhr.send(event.data.Attribute + "=" + event.data.Content[i]);
    }
}