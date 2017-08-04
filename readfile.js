var fs = require('fs');
var path = require('path');
var folderpath = 'D:\\Node\\Nodesample';
fs.writeFile('test.json', JSON.stringify({ 'test': 'hi' }), 'utf8', function (err) { });
fs.readdir(folderpath, function (err, items) {
    var extension = '.wav';
    items.filter(extension).forEach(function (value) {
        console.log('filter :' + value);
    });
    for (var i = 0; i < items.length; i++) {
        console.log(folderpath + '\\' + items[i]);
        var file = folderpath + '\\' + items[i];
        console.log(path.extname(file));
        fs.stat(file, function (err, stats) {
            console.log(stats["size"]);
        });
    }
});