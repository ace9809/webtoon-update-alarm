var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var fs = require("fs");
var url = "http://comic.naver.com/webtoon/weekday.nhn";
var toonObj = {};
console.log(url);
request(url, function(error, response, body) {
  if (error) throw error;
  var $ = cheerio.load(body);
  $("#content").find(".list_area.daily_all").each(function (i) {
    var list = $(this);
    var update = list.find(".ico_updt");
    console.log(update);

    if(update) {
      var title = update.parents('.thumb').html();
      fs.writeFile('./test.txt', title, function(err) {
        if(err) throw err;
        console.log(title);
      });
    }

  });
});

