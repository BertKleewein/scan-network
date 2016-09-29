var fs = require('fs');
var isHostUp = require('is-host-up');
var arp = require('node-arp');
var async = require('async');

var hostListFileName = '/home/bert/mac.json';

var getHostList = function(done) {
  fs.readFile(hostListFileName, 'utf8', function (err, data) {
    if (err) return done(err);
    var obj = JSON.parse(data);
    var hostList = {};
    for (var i = 0, len = obj.length; i < len; i++) {
      hostList[obj[i].macaddress.toString().toLowerCase()] = obj[i];
    }
    done(null,hostList);
  });
};

var hostList;
getHostList(function(err,hostList) {
  if (err) {
    console.log('err:' + err);
  } else {
    var tasks = [];
    for (var i=1; i<256;i++) {
      tasks.push(function(done) {
        var ip='192.168.15.'+i;
        console.log('scanning '+ip);
        isHostUp(ip, function(err, isUp) {
          console.log('done with '+ip);
          console.log('isup = '+isUp);
          if (isUp) {
            arp.getMAC(ip, function(err,mac) {
              if (err) {
                console.log('error finding mac for '+ip);
                done(err);
              } else {
                macLower = mac.toString().toLowerCase();
                var entry = hostList[key];
                if (entry) {
                  console.log(entry.compdesc + ' is up');
                } else {
                  console.log('unkonwn pc at ' + ip);
                }
                done();
              }
            });
          }
        });
      });
    }
    console.log('calling async now');
    async.parallelLimit(tasks, 10, function(err) {
      console.log('done - '+err);
    });
  }
});
