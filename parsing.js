var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var request_sync = require('sync-request');
var url = "http://comic.naver.com/webtoon/weekday.nhn";
var noId,urlSplit,webtoonJson,urlSplit2;
var webtoonCollection = [];
var testJson = require('./test.json');

request(url, function(error, response, body) {
  // console.log(JSON.stringify(testJson));
  console.log(testJson[1].no);
  // testJson.name = "test";
  // console.log(JSON.stringify(testJson));

  if (error) throw error;
  var $ = cheerio.load(body);
  $("#content").find(".title").each(function (i) {
    webtoon_list = $(this);
    var link = 'http://comic.naver.com' + webtoon_list.attr('href');
    var title = webtoon_list.attr("title");
    var res = request_sync('GET', link, {
      'headers': {
        'user-agent': 'example-user-agent'
      }});
    var episodes = cheerio.load(res.getBody());
    episodes(".title").find("a").first().each(function (i) {
      noId = episodes(this).attr("href");
      urlSplit = noId.split("&");
      urlSplit2 = urlSplit[1].split("=");

    })
    var webtoonObj = new Object();
    webtoonObj.link = link;
    webtoonObj.title = title;
    webtoonObj.no = urlSplit2[1];
    webtoonCollection.push(webtoonObj);
    var jsonInfo = JSON.stringify(webtoonCollection);
    // fs.writeFileSync('test.json', jsonInfo, 'utf8');

    // console.log(webtoonJson);
    // episodes(".detail").find(".wrt_nm").e이ach(function (i) {
    //   console.log("작가 : " + episodes(this).text().trim());
    // }); 작가 이름 나오게

  });
});
