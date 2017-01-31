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
  $(".toon_lst").find(".toon_info").each(function (i) {
    var list = $(this);
    var title = list.find(".toon_name").text();
    var update = list.find(".ico_up").text();
    toonObj = {
      title : title,
      update : update
    };
    console.log(toonObj);
  });
});