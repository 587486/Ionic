var speech = require('google-speech-api');
var opts = {
  file: 'Customer-04.wav',
  key: 'AIzaSyAUdjGIfVqWbnNnhYar6ZHTtYBemPAqiic'
};
speech(opts, function (err, results) {
  console.log(results);
});