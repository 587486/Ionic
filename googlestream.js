var fs = require('fs');
var Speech = require('@google-cloud/speech');
var speech = Speech({
  projectId: 'keen-defender-170610',
  keyFilename: 'GoogleCloudSpeechInGo-V1-14082c85f3c5.json',
});
var filename = 'Customer-04.wav';
var encoding = 'LINEAR16';
var sampleRateHertz = 16000;
var languageCode = 'en-US';

var request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode
  },
  interimResults: false // If you want interim results, set this to true
};

// Stream the audio to the Google Cloud Speech API
var recognizeStream = speech.streamingRecognize(request)
  .on('error', (err) => {console.log(err);})
  .on('data', (data) => {
    console.log(data);
    //console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
  });
// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);