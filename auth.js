var google = require('googleapis');
var fs = require('fs');

google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
        console.log(err);
    } else {




// authClient.getToken({projectId: 'keen-defender-170610'}, function (err, tokens) {
//   // Now tokens contains an access_token and an optional refresh_token. Save them.
//   if (!err) {
//     authClient.setCredentials(tokens);
//   }
// });



if (authClient.createScopedRequired && authClient.createScopedRequired()) {
    // Scopes can be specified either as an array or as a single, space-delimited string.
    authClient = authClient.createScoped(['https://www.googleapis.com/auth/cloud-platform']);
  };
          // google.options({
          //     proxy: 'http://587486:december@89@proxy.cognizant.com:6050',
          //     auth: authClient,
          //     params: { quotaUser: 'sheik.mohideen75@gmail.com' }
          // });

authClient.refreshAccessToken(function(err, tokens) {
//authClient.setCredentials(tokens);
});


        var api = google.speech({
            version: 'v1',
            auth: authClient
        });
        var filename = 'Customer-04.wav';
        var encoding = 'LINEAR16';
        var sampleRateHertz = 8000;
        var languageCode = 'en-US';
        var config = {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode
        };
        var audio = {
            content: fs.readFileSync(filename).toString('base64')
        };
        var request = {
            projectId: 'keen-defender-170610',
            config: config,
            audio: audio,
            auth : authClient
        };
        api.speech.recognize(request,{},function(results){
          console.log(JSON.stringify(results));
        });
    }
});