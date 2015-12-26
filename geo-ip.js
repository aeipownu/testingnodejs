//initializing geoip-lite and using my ip address as a test.
var geoip = require('geoip-lite')
var ip = "24.18.146.126";
var geo = geoip.lookup(ip);

console.log(geo);