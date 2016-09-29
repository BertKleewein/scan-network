var fs = require('fs');
var isHostUp = require('is-host-up');
var arp = require('node-arp');

var hostListFileName = '/home/bert/mac.json';

var getHostList = function(done) {
  fs.readFile(hostListFileName, 'utf8', function (err, data) {
    if (err) return done(err);
    var obj = JSON.parse(data);
    var hostList = {};
    for (var i = 0, len = obj.length; i < len; i++) {
      hostList[obj[i].macaddress] = obj[i];
    }
    done(null,hostList);
  });
};

var hostList;
getHostList(function(err,hostList) {
  if (err) {
    console.log('err:' + err);
  } else {
    Object.keys(hostList).forEach(function(key) {
      var x = hostList[key];
      isHostUp(x.lastip, function(err, isUp) {
        console.log(x.lastip);
        console.log(err);
        console.log(isUp);
        if (isUp) {
          console.log(x.compdesc + ' is up');
        }
      });
    });
  }
});
