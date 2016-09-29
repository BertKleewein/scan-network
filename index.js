var fs = require('fs');

var hostListFileName = '/home/bert/mac.json';

var getHostList = function(done) {
  fs.readFile(hostListFileName, 'utf8', function (err, data) {
    if (err) return done(err);
    var obj = JSON.parse(data);
    done(null,obj);
  });
};

getHostList(function(err,data) {
  if (err) {
    console.log('err:' + err);
  } else {
    console.log(JSON.stringify(data));
  }
});
