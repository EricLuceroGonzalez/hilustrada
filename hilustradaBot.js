const { tweetImage } = require("./tweetImage");
const { tweetRandomImage } = require("./tweetRandomImage");
(fs = require("fs")),
  (path = require("path")),
  (Twit = require("twit")),
  (config = require(path.join(__dirname, "config.js")));

// import
const Victoriano = new Twit(config);
// https://github.com/fourtonfish/random-image-twitterbot/blob/master/server.js

tweetRandomImage(Victoriano);
// Repeat each 1000*60*60*8 ms = 8 hours
setInterval(tweetRandomImage, 28800000);

// tweetImage(Victoriano,'first.jpg')
// hemerotecaIlustrada
