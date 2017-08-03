var fs = require('fs');
var speech = require('@google-cloud/speech')({
  projectId: 'keen-defender-170610',
  keyFilename: 'GoogleCloudSpeechInGo-V1-14082c85f3c5.json',
  //credentials: require('./SpeechAPI-b953a2e33e11.json')
});
var filename = 'Customer-04.wav';
// The encoding of the audio file, e.g. 'LINEAR16'
var encoding = 'LINEAR16';
// The sample rate of the audio file in hertz, e.g. 16000/8000
var sampleRateHertz = 8000;
// The BCP-47 language code to use, e.g. 'en-US'
var languageCode = 'en-US';
var config = {
  encoding: encoding,
  sampleRateHertz: sampleRateHertz,
  languageCode: languageCode
};
var audio = {
  content: fs.readFileSync(filename).toString('base64')
};
//var uri = 'https://text-to-speech-demo.mybluemix.net/api/synthesize?text=hello&voice=en-US_AllisonVoice';
// var audio = {
//      uri : uri
//  };
var request = {
  config: config,
  audio: audio
};
// Detects speech in the audio file
speech.recognize(request)
  .then((results) => {
    console.log(JSON.stringify(results));
    var transcription = results[0].results[0].alternatives[0].transcript;
    console.log(`Transcription: `, transcription);
    fs.writeFile('test.json', JSON.stringify(results), 'utf8', function (err) { console.log(err) });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });