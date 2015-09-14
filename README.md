# modernUpload

This is a script that allows you to upload files to the web. How original, right? With **modernUpload**, you can upload *without* freezing your UI thread! It utilizes Web Workers to send the files to a server of your choice. This allows your file(s) to be offloaded to another process and allow your user to do other things. It supports a progress bar feature, also (so your user knows what's up). Sounds cool, right? **PS:** jQuery is *not* required! huzzah!

## Usage

Download this repository. Add the `modernUploader.js` and `modernUploaderWorker.js` scripts wherever you want (but they need to be in the same folder). You can instantiate a new uploader by:

```javascript
var uploader = new modernUploader.uploader(
  inputElement, 
  progressElement, 
  remoteServerURI, 
  remoteServerAttribute, 
  pathToWebWorker);
```
