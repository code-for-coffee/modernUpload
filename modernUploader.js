/*
    modernUploader
    HTML5 Native Multi-select uploader
    With all sorts of neat features!
*/

// namespace modernUploader
modernUploader = {
    // class uploader
    uploader: function (inputElement, progressElement, remoteServerURI, remoteServerAttribute, pathToWebWorker) {

        if (inputElement == null || inputElement === "") {
            throw new Error("modernUploader: Invalid inputElementByID");
        }
        if (progressElement == null || progressElement === "") {
            throw new Error("modernUploader: Invalid progressElementByID");
        }
        if (remoteServerURI == null || remoteServerURI === "") {
            throw new Error("modernUploader: Invalid remoteServerURI");
        }
        if (!window.FileReader) {
            throw new Error("modernUploader: Your browser does not support the FileReader object.");
        }
        if (!window.Worker) {
            throw new Error("modernUploader: Your browser does not support the Web Worker object.");
        }

        this.fileCount = null;
        var fileCount = this.fileCount;
        this.files = [];
        var files = this.files;
        this.progressStatus = null;
        var progressStatus = this.progressStatus;
        this.progressPercentage = null;
        this.filesToSendToWorker = {
            Content: null,
            Count: null,
            Server: remoteServerURI,
            Attribute: remoteServerAttribute
        };
        var filesToSendToWorker = this.filesToSendToWorker;

        var w = new Worker(pathToWebWorker);
        var i = document.querySelector(inputElement);
        var p = document.querySelector(progressElement);

        w.onmessage = function (event) {
            //console.log(event.data);
            if (event.data == 200) {
                // positive
                progressStatus = progressStatus - 1;
                //console.log(progressStatus);
                var o = calculatePercentage(fileCount, progressStatus);
                var uploaded = fileCount - progressStatus;
                var okLabel = uploaded + " of " + fileCount + " files uploaded.";
                updateProgressBar(event.data, o, okLabel);
            } else {
                //negative
                progressStatus = progressStatus - 1;
                var m = calculatePercentage(fileCount, progressStatus);
                var errLabel = "Error: One or more file(s) failed to upload.";
                updateProgressBar(event.data, m, errLabel);
            }
        }
        w.onerror = function (error) {
            throw new Error("modernUploader: " + error);
        }

        this.calculatePercentage = function (total, remainder) {
            var k = 100 / total;
            var completed = total - remainder;
            var l = k * completed;
            return Math.round(l);
        } 
        var calculatePercentage = this.calculatePercentage;

        this.updateProgressBar = function (status, percentage, label) {
            if (status == 500) {
                p.className = "progress-bar progress-bar-danger";
                p.style.width = "100%";
                p.innerHTML = label;
            } else if (status == 200) {
                p.innerHTML = label;
                p.style.width = percentage + "%";
            }
        };
        var updateProgressBar = this.updateProgressBar;

        this.initialize = function () {
            // return length
            fileCount = i.files.length;
            if (fileCount < 1) {
                throw new Error("modernUploader: No files selected.");
            }
        };

        this.encodeFiles = function () {
            this.initialize();
            // read files as base64 and push into files[]
            for (var c = 0; c < i.files.length; c++) {
                // we have to create a new instance of the FileReader each time to keep this real-time
                var r = new FileReader();
                r.onload = function (event) {
                    try {
                        //console.log(event.target.result);
                        files.push(event.target.result);
                    } catch (ex) {
                        throw new Error("modernUploader: " + ex);
                    }
                }
                var temp = i.files[c];
                r.readAsDataURL(temp);
            }
        };

        this.startUpload = function () {
            this.encodeFiles();
            //console.log(files);
            filesToSendToWorker.Content = files;
            filesToSendToWorker.Count = fileCount;
            try {
                w.postMessage(filesToSendToWorker);
            } catch (e) {
                throw new Error("modernUploader: " + e);
            }
            progressStatus = fileCount;
        }
    }
};