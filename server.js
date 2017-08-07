var express = require('express'),
    fs = require('fs'),
    request = require('request'),
    app = express(),
    google = require('googleapis'),
    path = require('path'),
    args = process.argv,
    result = [];
port = 8056;
if (args.length < 3) { port = 8056 } else { port = args[2].split('=')[1] };
app.get('/api/recognize', function (req, res) {
    result = [];
    var encoding = 'LINEAR16';
    var sampleRateHertz = 8000;
    var languageCode = 'en-US';
    var config = {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode
    };
    var folderpath = 'Resource';
    var wait = true;
    var timerId = 0;
    function intervalFunc() {
        if (wait == false) {
            wait = true;
            res.send(JSON.stringify(result));
            clearInterval(timerId);
        };
    }
    timerId = setInterval(intervalFunc, 1500);
    fs.readdir(folderpath, function (err, items) {
        items.filter(item => path.extname(item) == '.wav').forEach(function (value) {
            wait = true;
            var filename = folderpath + '\\' + value;
            var audio = {
                content: fs.readFileSync(filename).toString('base64')
            };
            var requestparams = {
                config: config,
                audio: audio,
            };
            request.post({
                url: 'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCQNAQTvB33yctDkkK_pkqtuWvuZxXAN2k',
                body: requestparams,
                json: true,
                headers: { 'content-type': 'application/json' },
                Host: 'content-speech.googleapis.com',
                rejectUnauthorized: false
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                    res.status(500).send({ error: JSON.stringify(error) });
                } else {
                    if (body.results != undefined) {
                        result.push({ 'Transcription': body.results[0].alternatives[0].transcript });
                    } else {
                        result.push({ 'Transcription': '' });
                    }
                    if (items.length == result.length) {
                        wait = false;
                    };
                }
            });
        });
        //res.send(JSON.stringify(result));
    });
});
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://" + "localhost" + ":" + port + "/" + "api");
    console.log("Ctrl+C to stop the server");
});