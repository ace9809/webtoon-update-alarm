var request = require("request");
var cheerio = require("cheerio");
var webtoonDay = ['sun','mon','tue','wed','thu','fri','sat'];
var day = new Date();
var StringDay = webtoonDay[day.getDay()];
var url = "http://m.comic.naver.com/webtoon/weekday.nhn?week=" + StringDay;
var toonObj = {};
console.log(StringDay);
console.log(url);
request(url, function(error, response, body) {
  if (error) throw error;
  var $ = cheerio.load(body);
    $(".toon_lst").find(".toon_name").each(function (i) {
        var toonList = $(this).text();
        toonObj = {
          title : toonList
        };
      // console.log(toonObj);
    });
});
