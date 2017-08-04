'use strict'
var express = require('express'), fs = require('fs'), request = require('request'), app = express(), args = process.argv, port = 8056;
if (args.length < 3) { port = 8056 } else { port = args[2].split('=')[1] };
app.get('/api/recognize', function (req, res) {
    //console.log(req.query.id);
    //res.end(JSON.stringify({'data':'hi hello how are u'}));
    //res.status(500).send({ error: JSON.stringify(err) });
    


});
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://" + "localhost" + ":" + port + "/" + "api");
    console.log("Ctrl+C to stop the server");
});