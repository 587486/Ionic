var google = require('googleapis');
google.auth.getApplicationDefault(function (err, authClient) {
  if (err) {
    console.log(err);
  }else{
      console.log(authClient);
  }
});