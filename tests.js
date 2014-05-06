//tests.js
/// <reference path="../../Scripts/jasmine/jasmine.js" />
/// <reference path="modernUploader.js" />

describe("modernUploader", function () {

    it("calculatePercentage should not return greater than 100%", function () {
        var z = new modernUploader.uploader("#test", "#progress", "../../home/Upload", "upload", "../js/modernUpload/modernUploaderWorker.js");
        var x = z.calculatePercentage(100, 99);
        expect(x).toBeLessThan(100.1);
    });
    it("should properly instantiate custom JSON object", function() {
        var z = new modernUploader.uploader("#test", "#progress", "../../home/Upload", "upload", "../js/modernUpload/modernUploaderWorker.js");
        var x = z.filesToSendToWorker;
        expect(x.Attribute).toBeDefined();
        expect(x.Content).toBeNull();
        expect(x.Server).toBeDefined();
        expect(x.Count).toBeNull();
    });

});